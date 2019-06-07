import React, { Component } from 'react'
import withNav, { NavigationProvider } from '../../mixins/admin/NavigatableComponent'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ReactPaginate from 'react-paginate'
import TextField from '@material-ui/core/TextField'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import StudentsRepository, { StudentsProvider } from '../../mixins/admin/StudentsRepository'
import withProviders from '../../utils/withProviders'
import { withSnackbar } from 'notistack'
import Checkbox from '@material-ui/core/Checkbox'
import SearchIcon from '@material-ui/icons/Search'
import produce from 'immer'
import Typography from '@material-ui/core/Typography'
import Add from '@material-ui/icons/Add'
import HelpIcon from '@material-ui/icons/HelpOutline'
import Tooltip from '@material-ui/core/Tooltip'
import SaveButton from '../../components/common/SaveButton'
import accountBlockedHOC from '../../mixins/admin/AccountBlockedHOC'
import { compose } from 'recompose'
import { Dialog } from '@material-ui/core'
import { SubjectPicker } from './students/SubjectPicker'
import { getSubject, getSubjects, importStudents } from '../../api'
import {
    Card,
    Container,
    ExportContainer,
    NoStudentsText,
    NoStudentsWrapper,
    SearchCard,
    SearchIconButton,
    SearchInput,
    Spacer,
    TableToolbar,
    ToolbarTitle
} from '../../components/styled/admin/Students'
import { WithHorizontalMargin } from '../../components/styled/common'

class StudentsScreen extends StudentsRepository(withNav(Component)) {
    state = {
        selectedIds: [],
        query: '',
        inSearch: false,
        newStudent: {
            phone: '',
            fullName: '',
            email: ''
        },
        errors: {},
        modalOpened: false,
        subjects: [],
        searchValue: null
    }

    componentDidMount() {
        this.props.getStudents(1)
        this.changeHeader('Мои ученики')
    }

    searchStudents = () => {
        this.setState({ inSearch: !!this.state.query })
        this.props.getStudents(1, this.state.query)
    }

    reloadStudents = () => {
        this.setState({ inSearch: !!this.state.query })
        this.props.getStudents(this.props.currentPage, this.state.query)
    }

    onChangeSearch = event => {
        this.setState({ query: event.target.value })
    }

    onChangeSelected = student => () => {
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
        this.props.getStudents(page.selected + 1, query)
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
        if (!this.hasTariffInQuery()) {
            getSubjects().then(res => {
                this.setState({ modalOpened: true, subjects: res.data.results })
            })
            return
        }
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
                this.props.enqueueSnackbar(`Ученик ${newStudent.fullName} добавлен`)
                this.setState({
                    newStudent: {
                        phone: '',
                        fullName: '',
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

    handleModalClose = () => this.setState({ modalOpened: false })

    handleSubjectsSearch = e => {
        getSubjects(1, this.state.searchValue).then(res => this.setState({ subjects: res.data.results }))
    }

    handleSearchChange = event => {
        getSubjects(1, event.currentTarget.value).then(res =>
            this.setState({ subjects: res.data.results, searchValue: event.currentTarget.value })
        )
    }

    handleSubjectSave = subject => {
        const { selectedIds } = this.state
        getSubject(subject.id).then(({ data }) => {
            this.props.addStudentsToTariff(data && data.tariff.id, selectedIds).then(() => {
                this.props.enqueueSnackbar(`Ученики записаны на курс ${(data && data.tariff.name) || ''}`)
                this.setState({ selectedIds: [], modalOpened: false, searchValue: null })
            })
        })
    }

    uploadFile = e => {
        e.preventDefault()
        this.fileUploader.click()
    }

    onFileUpload = file => {
        if (file) {
            const body = new FormData()
            const file = this.fileUploader.files[0]
            body.append('file', file)
            importStudents(body)
                .then(response => {
                    this.props.enqueueSnackbar('Импорт начался, обновите страницу через минуту', { variant: 'success' })
                })
                .catch(error => {
                    this.props.enqueueSnackbar(error && error.response.data[0], { variant: 'error' })
                })
        }
    }

    createInputRef = element => (this.fileUploader = element)

    renderCreationItem = () => {
        const { phone, email, fullName } = this.state.newStudent
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
                    onChange={this.newStudentFieldChanged('fullName')}
                    label={'Имя'}
                    variant="outlined"
                    value={fullName}
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
                <SearchInput
                    placeholder="Поиск учеников"
                    value={this.state.query || ''}
                    onChange={this.onChangeSearch}
                />
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
                <TableCell align="center">{student.phone}</TableCell>
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
                {highlight ? (
                    <ToolbarTitle>
                        <Typography color="inherit" variant="subtitle1">
                            {selectedIds.length} выбрано
                        </Typography>
                    </ToolbarTitle>
                ) : (
                    <ToolbarTitle>
                        <Typography variant="h6" id="tableTitle">
                            Мои ученики
                        </Typography>
                    </ToolbarTitle>
                )}
                <Spacer />
                {highlight ? (
                    <Tooltip title={tooltipText}>
                        <IconButton aria-label="Добавить" onClick={this.subscribeStudents}>
                            <Add />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <ExportContainer>
                        <Button variant={'contained'} color="primary" onClick={this.uploadFile}>
                            Импортировать
                        </Button>
                        <WithHorizontalMargin margin={10}>
                            <IconButton>
                                <HelpIcon />
                            </IconButton>
                        </WithHorizontalMargin>
                    </ExportContainer>
                )}
            </TableToolbar>
        )
    }

    renderIntro = () => {
        return (
            <NoStudentsWrapper>
                <img style={{ height: 250, width: 190 }} src={'/frontend/images/no-students.svg'} />
                <NoStudentsText component={'p'}>
                    Добавляйте своих учеников в систему! Таким образом вы сможете контролировать их процесс обучения:
                    раздавать обучающий контент и выставлять персональные задания
                </NoStudentsText>
                <div style={{ height: 12 }} />
                <Button color="primary" variant={'contained'}>
                    Узнать подробнее
                </Button>
            </NoStudentsWrapper>
        )
    }

    renderBody = () => {
        return (
            <React.Fragment>
                {this.renderSearch()}
                {!this.noStudents() && (
                    <React.Fragment>
                        <Card marginTop={12} noPadding>
                            {this.renderToolbar()}
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox" />
                                        <TableCell align="left">Идентификатор</TableCell>
                                        <TableCell>Имя</TableCell>
                                        <TableCell>Телефон</TableCell>
                                        <TableCell align="right">Почта</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>{this.students().map(this.renderStudent)}</TableBody>
                            </Table>
                        </Card>
                        <div style={{ alignSelf: 'center' }}>
                            <ReactPaginate
                                disableInitialCallback
                                style={{ marginTop: 12, alignSelf: 'center' }}
                                pageCount={this.props.totalPages}
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
                )}
            </React.Fragment>
        )
    }

    noStudents = () => {
        return (
            !this.props.students.length &&
            !this.props.studentsFetching &&
            this.props.currentPage === 1 &&
            !this.state.inSearch
        )
    }

    render() {
        const { modalOpened, subjects, searchValue } = this.state

        return (
            <Container>
                {this.noStudents() && this.renderIntro()}
                {this.renderCreationItem()}
                {this.renderBody()}
                <Dialog open={modalOpened} onClose={this.handleModalClose}>
                    <SubjectPicker
                        subjects={subjects}
                        onSubjectSearch={this.handleSubjectsSearch}
                        onSubjectSave={this.handleSubjectSave}
                        searchValue={searchValue}
                        onSearchChange={this.handleSearchChange}
                    />
                </Dialog>
                <input
                    type="file"
                    accept=".xlsx"
                    ref={this.createInputRef}
                    style={{ display: 'none' }}
                    onChange={this.onFileUpload}
                />
            </Container>
        )
    }
}

const enhance = compose(
    accountBlockedHOC,
    withProviders(StudentsProvider, NavigationProvider),
    withSnackbar
)

export default enhance(StudentsScreen)
