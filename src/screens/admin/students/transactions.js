import React, { Component } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import styled from 'styled-components'
import { Card } from './index'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ReactPaginate from 'react-paginate'
import IconButton from '@material-ui/core/IconButton'
import MoreIcon from '@material-ui/icons/MoreVert'
import CheckIcon from '@material-ui/icons/Check'
import AddIcon from '@material-ui/icons/Add'
import moment from 'moment'
import { compose } from 'recompose'
import { ToolbarTitle, TableToolbar } from '../../../components/styled/student-admin'
import { WithHorizontalMargin } from '../../../components/styled/common'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { debounce } from 'lodash'
import { withSnackbar } from 'notistack'
import TextField from '@material-ui/core/TextField'
import { InlineDatePicker } from 'material-ui-pickers'
import SaveButton from '../../../components/common/SaveButton'
import produce from 'immer'
import startOfWeek from 'date-fns/startOfWeek'
import startOfDay from 'date-fns/startOfDay'
import format from 'date-fns/format'
import { getTransactions, createStudentTransaction, getPaymentVariants } from '../../../api'
import Collapse from '@material-ui/core/Collapse'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
`

class TransactionsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            transactions: [],
            paymentVariants: [],
            showNewTransaction: false,
            transaction: {
                paymentGateway: null,
                title: '',
                amount: 0,
                subject: this.subjectId()
            },
            errors: {},
            fetching: false,
            currentPage: 0,
            totalPages: 0,
            searchOpened: false,
            filters: {
                dateFrom: startOfWeek(new Date(), { weekStartsOn: 1 }),
                dateTo: new Date(),
                subjectId: this.subjectId()
            }
        }
    }

    componentDidMount() {
        this.getStudentTransactions(1)
        this.loadPaymentVariants()
    }

    loadPaymentVariants = () => {
        getPaymentVariants().then(({ data }) => {
            this.setState({ paymentVariants: data })
        })
    }

    addTransaction = () => {
        const { transaction } = this.state
        createStudentTransaction(this.studentId(), transaction)
            .then(({ data }) => {
                this.props.enqueueSnackbar('Счет выставлен', { variant: 'success' })
                this.getStudentTransactions(this.state.currentPage)
                this.setState({
                    transaction: {
                        paymentGateway: null,
                        title: '',
                        amount: 0
                    }
                })
            })
            .catch(({ response }) => {
                this.setState({ errors: response.data })
            })
    }

    getStudentTransactions = (page = 1) => {
        const { filters } = this.state
        this.setState({ fetching: true })
        const dateFrom = format(filters.dateFrom, 'yyyy-MM-dd')
        const dateTo = format(filters.dateTo, 'yyyy-MM-dd')
        getTransactions({ page, studentId: this.studentId(), ...filters, dateFrom, dateTo })
            .then(({ data }) => {
                const { count, results } = data
                this.setState({ transactions: results, totalPages: count, currentPage: page, fetching: false })
            })
            .catch(({ response }) => {
                this.setState({ fetching: false })
            })
    }

    subjectId = () => this.props.match.params['subjectId']

    studentId = () => this.props.match.params['studentId']

    transactions = () => this.state.transactions

    onPageChanged = page => {
        this.getStudentTransactions(page.selected + 1)
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.filters !== this.state.filters) {
            this.getStudentTransactions(1)
        }
    }

    newTransactionChanged = field => event => {
        this.setState(
            produce(this.state, draft => {
                draft.transaction[field] = event.target.value
                delete draft.errors[field]
            })
        )
    }

    filterChanged = name => event => {
        let value = null
        value = startOfDay(event)
        this.setState(
            produce(draft => {
                draft.filters[name] = value
            })
        )
    }

    renderCreationItem = () => {
        console.log(this.state.transaction)
        const { paymentGateway, title, amount } = this.state.transaction
        return (
            <Collapse in={this.state.showNewTransaction}>
                <Card marginTop={12}>
                    <Typography variant="h6">Создать счет</Typography>
                    <TextField
                        onChange={this.newTransactionChanged('title')}
                        label={'Описание*'}
                        variant="outlined"
                        placeholder="Описание для ученика"
                        value={title}
                        fullWidth
                        multiline
                        margin={'normal'}
                    />
                    <TextField
                        select
                        variant="outlined"
                        margin="normal"
                        label="Вариант оплаты"
                        fullWidth
                        value={paymentGateway || ''}
                        onChange={this.newTransactionChanged('paymentGateway')}
                    >
                        {this.state.paymentVariants.map(pg => (
                            <MenuItem key={pg.id} value={pg.id}>
                                {pg.title}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        onChange={this.newTransactionChanged('amount')}
                        label={'Стоимость'}
                        variant="outlined"
                        type="number"
                        step={'0.01'}
                        value={amount}
                        fullWidth
                        margin={'normal'}
                    />
                    <SaveButton onClick={this.addTransaction} />
                </Card>
            </Collapse>
        )
    }

    renderTransaction = (transaction, index) => {
        const amountFormatted = new Intl.NumberFormat('ru', {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 2,
            minimumFractionDigits: 0
        }).format(transaction.amount)
        const { anchorEl } = this.state
        return (
            <TableRow key={transaction.id}>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>{transaction.paymentTitle}</TableCell>
                <TableCell>{amountFormatted}</TableCell>
                <TableCell>{transaction.paidAt ? <CheckIcon /> : null}</TableCell>
                <TableCell>
                    <IconButton
                        aria-owns={anchorEl ? 'transaction-options' : undefined}
                        aria-haspopup="true"
                        onClick={e => this.setState({ anchorEl: e.currentTarget })}
                    >
                        <MoreIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    }

    renderToolbar = () => {
        return (
            <TableToolbar highlight={false}>
                <ToolbarTitle>
                    <Typography variant="h6" id="tableTitle">
                        Оплаты
                    </Typography>
                </ToolbarTitle>
                <Tooltip title={'Назначить оплату'}>
                    <IconButton
                        aria-label="Добавить"
                        onClick={() => this.setState({ showNewTransaction: !this.state.showNewTransaction })}
                    >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </TableToolbar>
        )
    }

    renderBody = () => {
        const { anchorEl } = this.state
        return (
            <React.Fragment>
                <Card marginTop={12} noPadding>
                    {this.renderToolbar()}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Назначение</TableCell>
                                <TableCell>Описание</TableCell>
                                <TableCell>Размер оплаты</TableCell>
                                <TableCell>Оплачен</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>{this.transactions().map(this.renderTransaction)}</TableBody>
                    </Table>
                </Card>
                <Menu
                    id="transaction-options"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => this.setState({ anchorEl: null })}
                >
                    <MenuItem>Скопировать</MenuItem>
                </Menu>
                <div style={{ alignSelf: 'center' }}>
                    <ReactPaginate
                        disableInitialCallback
                        style={{ marginTop: 12, alignSelf: 'center' }}
                        pageCount={this.state.totalPages}
                        initialPage={0}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={this.onPageChanged}
                        previousLabel="<<"
                        nextLabel=">>"
                        containerClassName={'pagination'}
                    />
                </div>
            </React.Fragment>
        )
    }

    render() {
        const { filters } = this.state
        console.log(filters)
        return (
            <Container>
                <Card marginTop={12}>
                    <Typography variant={'h6'}>Фильтры</Typography>
                    <div style={{ display: 'flex' }}>
                        <WithHorizontalMargin margin={12}>
                            <InlineDatePicker
                                onlyCalendar
                                format={'MM.dd.yyyy'}
                                margin={'normal'}
                                variant="outlined"
                                label="C"
                                value={filters.dateFrom}
                                onChange={this.filterChanged('dateFrom')}
                            />
                        </WithHorizontalMargin>
                        <WithHorizontalMargin margin={12}>
                            <InlineDatePicker
                                onlyCalendar
                                format={'MM.dd.yyyy'}
                                margin={'normal'}
                                variant="outlined"
                                label="До"
                                value={filters.dateTo}
                                onChange={this.filterChanged('dateTo')}
                            />
                        </WithHorizontalMargin>
                    </div>
                </Card>
                {this.renderCreationItem()}
                {this.renderBody()}
            </Container>
        )
    }
}

const enhance = compose(withSnackbar)

export default enhance(TransactionsScreen)
