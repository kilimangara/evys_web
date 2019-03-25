import React, { Component } from 'react'
import withProviders from '../../../utils/withProviders'
import StudentTestBlockRepository, { TestBlockProvider } from '../../../mixins/admin/StudentTestBlockRepository'
import withNav, { NavigationProvider } from '../../../mixins/admin/NavigatableComponent'
import LinearProgress from '@material-ui/core/LinearProgress'
import styled from 'styled-components'
import { Card } from './index'
import { TableToolbar, ToolbarTitle } from './student-management'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ReactPaginate from 'react-paginate'
import moment from 'moment'
import { compose } from 'recompose'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
`

const NoTestsWrapper = styled.div`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const NoTestsText = styled(Typography)`
    font-weight: 300;
    font-size: 22px;
    text-align: center;
    color: black;
`

class StudentTestBlocks extends withNav(StudentTestBlockRepository(Component)) {
    state = {
        tests: [],
        fetching: false,
        currentPage: 0,
        totalPages: 0
    }

    componentDidMount() {
        this.getStudentTests()
        this.reloadNavigation()
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.reloadNavigation()
        }
    }

    reloadNavigation = () =>
        this.changeNavigation({
            header: `Управление учениками`,
            backUrl: `/admin/subjects/${this.subjectId()}/students`
        })

    onPageChanged = page => {
        if (page.selected == 0) return
        this.getStudentTests(page.selected)
    }

    renderTest = (test, index) => {
        const startedAt = test.startedAt ? moment(test.startedAt).fromNow() : 'Не начато'
        return (
            <TableRow key={test.id}>
                <TableCell>{test.theme.name}</TableCell>
                <TableCell>{test.passed ? 'Пройдено' : 'Не пройдено'}</TableCell>
                <TableCell>{startedAt}</TableCell>
                <TableCell>
                    <Button variant="outlined" color="primary" onClick={this.goToTestBlock(test.id)}>
                        Проверить
                    </Button>
                </TableCell>
            </TableRow>
        )
    }

    goToTestBlock = testBlockId => () => {
        this.props.history.push(`/admin/subjects/${this.subjectId()}/students/${this.studentId()}/test/${testBlockId}`)
    }

    renderToolbar = () => {
        return (
            <TableToolbar highlight={false}>
                <ToolbarTitle>
                    <Typography variant="h6" id="tableTitle">
                        Тестирования
                    </Typography>
                </ToolbarTitle>
            </TableToolbar>
        )
    }

    renderIntro = () => {
        if (!this.noTests()) return null
        return (
            <NoTestsWrapper>
                <img style={{ height: 250, width: 190 }} src={'/frontend/images/no-students.svg'} />
                <NoTestsText component={'p'}>
                    Этот ученик еще не проходил никаких заданий... Вы можете дождаться пока он что-то начнет делать или
                    сами назначьте ему задание
                </NoTestsText>
                <div style={{ height: 12 }} />
                <Button color="primary" variant={'contained'}>
                    Узнать подробнее
                </Button>
            </NoTestsWrapper>
        )
    }

    renderBody = () => {
        if (this.noTests()) return null
        return (
            <React.Fragment>
                <Card marginTop={12} noPadding>
                    {this.renderToolbar()}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Задание по теме</TableCell>
                                <TableCell>Статус</TableCell>
                                <TableCell>Начало</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>{this.tests().map(this.renderTest)}</TableBody>
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
        return (
            <Container>
                {this.renderIntro()}
                {this.renderBody()}
            </Container>
        )
    }
}

const enhance = compose(withProviders(TestBlockProvider, NavigationProvider))

export default enhance(StudentTestBlocks)
