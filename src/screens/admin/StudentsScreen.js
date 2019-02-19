import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import ReactPaginate from 'react-paginate'
import TextField from '@material-ui/core/TextField'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components'
import StudentsRepository, { StudentsProvider } from '../../mixins/admin/StudentsRepository'
import withProviders from '../../utils/withProviders'
import { withSnackbar } from 'notistack'
import Checkbox from '@material-ui/core/Checkbox'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import produce from 'immer'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import { theme } from '../../utils/global_theme'
import Add from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import SaveButton from '../../components/common/SaveButton'

const Card = styled.div`
    margin-top: ${({ marginTop = 0 }) => `${marginTop}px`};
    border: 1px solid rgba(0, 0, 0, 0.12);
    background-color: white;
    box-shadow: 0 0 1px #bdbfc1, 0 1px #ced2d3;
    padding: ${({ noPadding }) => (noPadding ? '0px' : '12px')};
`

const SearchCard = styled.div`
    margin-top: ${({ marginTop = 0 }) => `${marginTop}px`};
    border: 1px solid rgba(0, 0, 0, 0.12);
    background-color: white;
    box-shadow: 0 0 1px #bdbfc1, 0 1px #ced2d3;
    padding: 4px;
    display: flex;
    align-items: center;
`

const Container = styled.div`
    display: flex;
    padding: 24px 12px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
`

const SearchIconButton = styled(IconButton)`
    padding: 10px;
`

const SearchInput = styled(InputBase)`
    margin-left: 24px;
    flex: 1;
`

const Spacer = styled.div`
    flex: 1 1 100%;
`

const ToolbarTitle = styled.div`
    flex: 0 0 auto;
`

const TableToolbar = styled(({ highlight, ...props }) => <Toolbar {...props} />)`
    color: ${({ highlight }) => (highlight ? theme.ACCENT_COLOR : 'black')};
    background-color: ${({ highlight }) => (highlight ? theme.ACCENT_COLOR_A(0.5) : 'white')};
`

class StudentsScreen extends StudentsRepository(Component) {
    state = {
        selectedIds: [],
        query: '',
        newStudent: {
            phone: '',
            name: '',
            email: ''
        },
        errors: {}
    }

    componentDidMount() {
        this.props.getStudents(1)
    }

    searchStudents = () => {
        this.props.getStudents(1, this.state.query)
    }

    reloadStudents = () => {
        this.props.getStudents(this.props.currentPage, this.state.query)
    }

    onChangeSearch = event => {
        this.setState({ query: event.target.value })
    }

    onChangeSelected = student => (event, checked) => {
        this.setState(
            produce(this.state, draft => {
                const idIndex = draft.selectedIds.findIndex(el => el === student.id)
                if (idIndex === -1) draft.selectedIds.push(student.id)
                else draft.selectedIds.splice(idIndex, 1)
            })
        )
    }

    onPageChanged = page => {
        const { query } = this.state
        if (page.selected == 0) return
        this.props.getStudents(page.selected, query)
    }

    newStudentFieldChanged = field => event => {
        this.setState(
            produce(this.state, draft => {
                draft.newStudent[field] = event.target.value
            })
        )
    }

    subscribeStudents = () => {
        const { selectedIds } = this.state
        this.props
            .addStudentsToTariff(this.queryTariffId(), selectedIds)
            .then(() => {
                this.props.enqueueSnackbar(`Ученики записаны на курс ${this.queryTariffName()}`)
                this.setState({ selectedIds: [] })
            })
            .catch(() => {
                this.props.enqueueSnackbar('Произошла ошибка', {
                    variant: 'error'
                })
            })
    }

    addStudent = () => {
        const { newStudent } = this.state
        this.props
            .newStudent(newStudent)
            .then(() => {
                this.props.enqueueSnackbar(`Ученик ${newStudent.name} добавлен`)
                this.setState({
                    newStudent: {
                        phone: '',
                        name: '',
                        email: ''
                    }
                })
                this.reloadStudents()
            })
            .catch(err => {
                if (response.status === 402)
                    this.props.enqueueSnackbar('Ваш тарифный план не поддерживает большее кол-во учеников', {
                        variant: 'error'
                    })
            })
    }

    renderCreationItem = () => {
        const { phone, email, name } = this.state.newStudent
        return (
            <Card>
                <Typography variant="h6">Добавить ученика</Typography>
                <TextField
                    onChange={this.newStudentFieldChanged('phone')}
                    label={'Телефон*'}
                    variant="outlined"
                    value={phone}
                    fullWidth
                    margin={'normal'}
                />

                <TextField
                    onChange={this.newStudentFieldChanged('name')}
                    label={'Имя'}
                    variant="outlined"
                    value={name}
                    fullWidth
                    margin={'normal'}
                />
                <TextField
                    onChange={this.newStudentFieldChanged('email')}
                    label={'Почта'}
                    variant="outlined"
                    value={email}
                    fullWidth
                    margin={'normal'}
                />
                <SaveButton onClick={this.addStudent} />
            </Card>
        )
    }

    renderSearch = () => {
        return (
            <SearchCard marginTop={12}>
                <SearchInput placeholder="Поиск учеников" value={this.state.query} onChange={this.onChangeSearch} />
                <SearchIconButton aria-label="Искать" onClick={this.searchStudents}>
                    <SearchIcon />
                </SearchIconButton>
            </SearchCard>
        )
    }

    renderStudent = (student, index) => {
        const { selectedIds } = this.state
        const isSelected = selectedIds.includes(student.id)
        return (
            <TableRow hover role="checkbox" key={student.id}>
                <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={isSelected} onChange={this.onChangeSelected(student)} />
                </TableCell>
                <TableCell align="left">{student.id}</TableCell>
                <TableCell>{student.fullName}</TableCell>
                <TableCell align="right">{student.phone}</TableCell>
                <TableCell align="right">{student.email}</TableCell>
            </TableRow>
        )
    }

    renderToolbar = () => {
        const { selectedIds } = this.state
        const highlight = Boolean(selectedIds.length)
        const tooltipText = Boolean(this.queryTariffId())
            ? `Добавить учеников к курсу ${this.queryTariffName()}`
            : 'Выбрать курс'
        return (
            <TableToolbar highlight={highlight}>
                <ToolbarTitle>
                    {highlight ? (
                        <Typography color="inherit" variant="subtitle1">
                            {selectedIds.length} выбрано
                        </Typography>
                    ) : (
                        <Typography variant="h6" id="tableTitle">
                            Мои ученики
                        </Typography>
                    )}
                </ToolbarTitle>
                <Spacer />
                {highlight && (
                    <Tooltip title={tooltipText}>
                        <IconButton aria-label="Добавить" onClick={this.subscribeStudents}>
                            <Add />
                        </IconButton>
                    </Tooltip>
                )}
            </TableToolbar>
        )
    }

    render() {
        return (
            <Container>
                {this.renderCreationItem()}
                {this.renderSearch()}
                <Card marginTop={12} noPadding>
                    {this.renderToolbar()}
                    <Table>
                        <TableHead>
                            <TableCell padding="checkbox" />
                            <TableCell align="left">Идентификатор</TableCell>
                            <TableCell>Имя</TableCell>
                            <TableCell>Телефон</TableCell>
                            <TableCell align="right">Почта</TableCell>
                        </TableHead>
                        <TableBody>{this.students().map(this.renderStudent)}</TableBody>
                    </Table>
                </Card>
                <div style={{ alignSelf: 'center' }}>
                    <ReactPaginate
                        disableInitialCallback
                        style={{ marginTop: 12, alignSelf: 'center' }}
                        pageCount={this.props.totalPages}
                        initialPage={this.props.currentPage}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={this.onPageChanged}
                        previousLabel="<<"
                        nextLabel=">>"
                        containerClassName={'pagination'}
                    />
                </div>
            </Container>
        )
    }
}

export default withProviders(StudentsProvider)(withSnackbar(StudentsScreen))
