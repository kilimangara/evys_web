import React, { Component } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import styled from 'styled-components'
import { Card } from './index'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ReactPaginate from 'react-paginate'
import IconButton from '@material-ui/core/IconButton'
import MoreIcon from '@material-ui/icons/MoreVert'
import CheckIcon from '@material-ui/icons/Check'
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
import produce from 'immer'
import startOfWeek from 'date-fns/startOfWeek'
import startOfDay from 'date-fns/startOfDay'
import { getTransactions, createStudentTransaction } from '../../../api'

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
            fetching: false,
            currentPage: 0,
            totalPages: 0,
            searchOpened: false,
            filters: {
                dateFrom: startOfWeek(new Date(), { weekStartsOn: 1 }),
                dateTo: new Date()
            }
        }
    }

    componentDidMount() {
        this.getStudentTransactions(1)
    }

    getStudentTransactions = (page = 1) => {
        const { filters } = this.state
        this.setState({ fetching: true })
        getTransactions({ page, studentId: this.studentId(), ...filters })
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

    filterChanged = name => event => {
        let value = null
        value = startOfDay(event)
        this.setState(
            produce(draft => {
                draft.filters[name] = value
            })
        )
    }

    renderTest = (transaction, index) => {
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
                        <TableBody>{this.transactions().map(this.renderTest)}</TableBody>
                    </Table>
                </Card>
                <Menu
                    id="transaction-options"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => this.setState({ anchorEl: null })}
                >
                    <MenuItem>Скопировать</MenuItem>
                    <MenuItem>Отправить ученику</MenuItem>
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
                {this.renderBody()}
            </Container>
        )
    }
}

const enhance = compose(withSnackbar)

export default enhance(TransactionsScreen)
