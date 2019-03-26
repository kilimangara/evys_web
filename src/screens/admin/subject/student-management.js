import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ReactPaginate from 'react-paginate'
import TextField from '@material-ui/core/TextField'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components'
import withProviders from '../../../utils/withProviders'
import Checkbox from '@material-ui/core/Checkbox'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import produce from 'immer'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import { theme } from '../../../utils/global_theme'
import Tooltip from '@material-ui/core/Tooltip'
import accountBlockedHOC from '../../../mixins/admin/AccountBlockedHOC'
import { compose } from 'recompose'
import { loadSubjectStudents } from '../../../reducers/admin/subjects'
import { Card } from './index.js'

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

const NoStudentsWrapper = styled.div`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const NoStudentsText = styled(Typography)`
    font-weight: 300;
    font-size: 22px;
    text-align: center;
    color: black;
`

export const TableToolbar = styled(({ highlight, ...props }) => <Toolbar {...props} />)`
    color: ${({ highlight }) => (highlight ? theme.ACCENT_COLOR : 'black')};
    background-color: ${({ highlight }) => (highlight ? theme.ACCENT_COLOR_A(0.5) : 'white')};
`

export const ToolbarTitle = styled.div`
    flex: 1 0 auto;
`

class StudentManagement extends Component {
    state = {
        students: [],
        totalPages: 1,
        currentPage: 0,
        query: '',
        fetching: false
    }

    componentDidMount() {
        this.loadStudents()
    }

    loadStudents = (page = 1, query = '') => {
        return this.props.loadStudents(this.subjectId(), { page, query }).then(({ data }) => {
            const { count, results } = data
            this.setState({
                students: results,
                totalPages: count,
                currentPage: page,
                fetching: false
            })
        })
    }

    reloadStudents = () => {
        this.loadStudents(this.state.currentPage, this.state.query)
    }

    onChangeSearch = event => {
        this.setState({ query: event.target.value })
    }

    onPageChanged = page => {
        const { query } = this.state
        this.loadStudents(page.selected + 1, query)
    }

    searchStudents = () => {
        this.loadStudents(1, this.state.query)
    }

    goToStudent = studentId => () => {
        this.props.history.push(`/admin/subjects/${this.subjectId()}/students/${studentId}`)
    }

    renderStudent = (student, index) => {
        return (
            <TableRow key={student.id}>
                <TableCell align="left">{student.id}</TableCell>
                <TableCell>{student.fullName}</TableCell>
                <TableCell align="center">{student.progress}</TableCell>
                <TableCell align="center">{student.academicPerformance}</TableCell>
                <TableCell>
                    <Button variant="outlined" color="primary" onClick={this.goToStudent(student.id)}>
                        Подробнее
                    </Button>
                </TableCell>
            </TableRow>
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

    subjectId = () => this.props.match.params['subjectId']

    students = () => this.state.students

    renderToolbar = () => {
        return (
            <TableToolbar highlight={false}>
                <ToolbarTitle>
                    <Typography variant="h6" id="tableTitle">
                        Мои ученики
                    </Typography>
                </ToolbarTitle>
            </TableToolbar>
        )
    }

    noStudents = () => {
        return !this.state.students.length && !this.state.fetching && this.state.currentPage === 1
    }

    renderIntro = () => {
        if (!this.noStudents()) return null
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
        if (!this.state.students.length) return null
        return (
            <React.Fragment>
                {this.renderSearch()}
                <Card marginTop={12} noPadding>
                    {this.renderToolbar()}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Идентификатор</TableCell>
                                <TableCell>Имя</TableCell>
                                <TableCell>Прогрес</TableCell>
                                <TableCell>Успеваемость</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>{this.students().map(this.renderStudent)}</TableBody>
                    </Table>
                </Card>
                <div style={{ alignSelf: 'center' }}>
                    <ReactPaginate
                        disableInitialCallback
                        style={{ marginTop: 12, alignSelf: 'center' }}
                        pageCount={this.state.totalPages}
                        initialPage={1}
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
        return (
            <Container>
                {this.renderIntro()}
                {this.renderBody()}
            </Container>
        )
    }
}

class StudentManagementProvider {
    static mapStateToProps = null

    static mapDispatchToProps = {
        loadStudents: loadSubjectStudents
    }
}

const enhance = compose(
    withProviders(StudentManagementProvider),
    accountBlockedHOC
)

export default enhance(StudentManagement)
