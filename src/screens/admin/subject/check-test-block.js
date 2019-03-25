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
import moment from 'moment'
import { compose } from 'recompose'
import EvysQuill from '../../../components/quill/EvysQuill'
import Checkbox from '@material-ui/core/Checkbox'
import produce from 'immer'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
`

class StudentTestBlock extends withNav(StudentTestBlockRepository(Component)) {
    state = {
        testBlock: null
    }

    componentDidMount() {
        this.getTestBlock()
        this.reloadNavigation()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.testBlock != this.state.testBlock) this.reloadNavigation()
    }

    handleChangeCheckBox = testPackId => (event, checked) => {
        this.setState(
            produce(draft => {
                const ts = draft.testBlock.testPacks.find(el => el.id === testPackId)
                if (!ts) return
                ts.result.isRight = checked
            })
        )
    }

    reloadNavigation = () =>
        this.changeNavigation({
            header: `Проверка задания`,
            backUrl: `/admin/subjects/${this.subjectId()}/students/${this.studentId()}`
        })

    renderTest = (testPack, index) => {
        return (
            <TableRow key={testPack.id}>
                <TableCell>
                    <EvysQuill value={testPack.test.task} readOnly={true} />
                </TableCell>
                <TableCell>{testPack.passed ? 'Пройдено' : 'Не пройдено'}</TableCell>
                <TableCell>{testPack.result ? testPack.result.studentAnswer : 'Нет ответа'}</TableCell>
                <TableCell>
                    {testPack.result && (
                        <Checkbox
                            checked={testPack.result.isRight}
                            onChange={this.handleChangeCheckBox(testPack.id)}
                            color="primary"
                        />
                    )}
                </TableCell>
            </TableRow>
        )
    }

    renderToolbar = () => {
        return (
            <TableToolbar highlight={false}>
                <ToolbarTitle>
                    <Typography variant="h6" id="tableTitle">
                        Тест по теме '{this.state.testBlock.theme.name}'
                    </Typography>
                </ToolbarTitle>
            </TableToolbar>
        )
    }

    renderBody = () => {
        const { testBlock } = this.state
        return (
            <React.Fragment>
                <Card marginTop={12} noPadding>
                    {this.renderToolbar()}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Задание</TableCell>
                                <TableCell>Статус</TableCell>
                                <TableCell>Ответ ученика</TableCell>
                                <TableCell>Правильность</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{testBlock.testPacks.map(this.renderTest)}</TableBody>
                    </Table>
                </Card>
            </React.Fragment>
        )
    }

    render() {
        if (!this.state.testBlock)
            return (
                <div>
                    <LinearProgress />
                </div>
            )
        return <Container>{this.renderBody()}</Container>
    }
}

const enhance = compose(withProviders(TestBlockProvider, NavigationProvider))

export default enhance(StudentTestBlock)
