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

class StudentManagement extends Component {
    state = {
        students: [],
        totalPages: 1,
        currentPage: 0,
        query: ''
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
        if (page.selected == 0) return
        this.loadStudents(page.selected, query)
    }

    searchStudents = () => {
        this.loadStudents(1, this.state.query)
    }

    renderStudent = (student, index) => {
        return <TableRow key={student.id} />
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

    renderIntro = () => {
        if (!!this.state.students.length) return null
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
                    <Table>
                        <TableHead>
                            <TableCell align="left">Идентификатор</TableCell>
                            <TableCell>Имя</TableCell>
                            <TableCell>Прогресс</TableCell>
                            <TableCell>Успеваемость</TableCell>
                            <TableCell />
                        </TableHead>
                        <TableBody>{this.students().map(this.renderStudent)}</TableBody>
                    </Table>
                </Card>
                <div style={{ alignSelf: 'center' }}>
                    <ReactPaginate
                        disableInitialCallback
                        style={{ marginTop: 12, alignSelf: 'center' }}
                        pageCount={this.state.totalPages}
                        initialPage={this.state.currentPage}
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
        const { students, currentPage, totalPages } = this.state
        console.log(students)
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
