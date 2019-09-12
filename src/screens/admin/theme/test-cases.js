import React from 'react'
import ReactDOM from 'react-dom'
import withProviders from '../../../utils/withProviders'
import SaveButton from '../../../components/common/SaveButton'
import { Card } from './index'
import EvysQuill from '../../../components/quill/EvysQuill'
import TestCaseRepository, { TestCaseProvider } from '../../../mixins/admin/TestCaseRepository'
import List from '@material-ui/core/List'
import { ListHeader, ListText } from './index'
import ListItem from '@material-ui/core/ListItem'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import produce from 'immer'
import Sortable from 'sortablejs'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import green from '@material-ui/core/colors/green'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'

const Check = function() {
    return <Icon>check</Icon>
}

const SaveCheckIcon = styled(Check)`
    color: ${green[500]};
`

const ListItemContainer = styled.div`
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

class TestCases extends TestCaseRepository(React.Component) {
    state = {
        testCases: null,
        selectedTestCase: null,
        selectedTest: null,
        loading: false,
        description: '',
        answer: {
            isRight: false,
            content: ''
        }
    }

    componentDidMount() {
        this.loadTestCases()
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.testCases && this.state.testCases) {
            const listElement = ReactDOM.findDOMNode(this.list)
            const sortable = new Sortable(listElement, {
                handle: '.sortable-handle',
                filter: '.ignore-drag',
                onEnd: this.updateVariantPositions
            })
        }
    }

    updateVariantPositions = event => {
        const { oldIndex, newIndex } = event
        let ts = this.state.testCases[oldIndex - 1]
        this.setState(
            produce(this.state, draft => {
                let tsToChanged = draft.testCases[oldIndex - 1]
                tsToChanged.analogueId = newIndex
            }),
            () => this.updateTestCase(ts.id)
        )
    }

    selectTestCase = (testCaseId, testId) => () => {
        this.setState({ selectedTestCase: testCaseId, selectedTest: testId })
    }

    descriptionChanged = event => {
        this.setState({ description: event.target.value })
    }

    onDeleteTestCase = testCaseId => () => {
        this.deleteTestCase(testCaseId)
    }

    testCaseHasDrafts = testCaseId => {
        const testCase = this.state.testCases.find(el => el.id === testCaseId)
        if (!testCase) return false
        return Boolean(testCase.tests.filter(el => el.draft).length)
    }

    renderVariants = testCaseId => (test, index) => {
        const { selectedTest } = this.state
        const color = !test.draft ? 'primary' : 'secondary'
        const variant = test.id === selectedTest ? 'contained' : 'outlined'
        return (
            <div style={{ marginLeft: 8 }} key={test.id}>
                <Button variant={variant} color={color} onClick={this.selectTestCase(testCaseId, test.id)}>
                    Вариант {index + 1}
                </Button>
            </div>
        )
    }

    renderTestCase = (testCase, index) => {
        const showTestCase = testCase.id === this.state.selectedTestCase
        return (
            <ListItem key={testCase.id} divider className="test-cases-for-filter">
                <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex' }}>
                        <ListItemContainer>
                            <Icon className={'sortable-handle'}>list</Icon>
                            <div style={{ width: 12 }} />
                            <Typography component={'span'}>{`${testCase.description}`}</Typography>
                            {testCase.tests.map(this.renderVariants(testCase.id))}
                        </ListItemContainer>
                        {this.testCaseHasDrafts(testCase.id) && (
                            <IconButton onClick={() => this.updateTestCase(testCase.id)}>
                                <SaveCheckIcon />
                            </IconButton>
                        )}
                        <IconButton>
                            <Icon>add</Icon>
                        </IconButton>
                        <IconButton onClick={this.onDeleteTestCase(testCase.id)}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </div>
                    {showTestCase && this.renderQuestionItem()}
                </div>
            </ListItem>
        )
    }

    getCurrentAnalogueId = () => {
        const { testCases } = this.state
        if (!testCases.length) return '1.'
        return `${testCases[testCases.length - 1].analogueId + 1}.`
    }

    submitNewTestCase = e => {
        e.preventDefault()
        this.createTestCase(this.getCurrentAnalogueId(), this.state.description).then(({ data }) => {
            this.setState({ description: '', selectedTestCase: data.id, selectedTest: data.tests[0].id })
        })
    }

    findTest = () => {
        const { selectedTestCase, selectedTest } = this.state
        const testCase = this.state.testCases.find(el => el.id === selectedTestCase)
        if (!testCase) return null
        const test = testCase.tests.find(el => el.id === selectedTest)
        return test
    }

    testTypeChanged = event => {
        const { value, checked } = event.target
        let testType = 'A'
        if (checked) testType = value
        this.testChanged('type')(testType)
    }

    testChanged = field => event => {
        const { selectedTestCase, selectedTest } = this.state
        let value = event
        if (event.target) value = event.target.value
        this.setState(
            produce(this.state, draft => {
                const testCase = draft.testCases.find(el => el.id === selectedTestCase)
                if (!testCase) return
                const test = testCase.tests.find(el => el.id === selectedTest)
                if (!test) return
                if (test[field] === value) return
                test[field] = value
                test.draft = true
            })
        )
    }

    answerChanged = (answerId, field) => (event, newValue) => {
        const { selectedTestCase, selectedTest } = this.state
        let value = event.target.value
        if (field === 'isRight') value = newValue
        this.setState(
            produce(this.state, draft => {
                const testCase = draft.testCases.find(el => el.id === selectedTestCase)
                if (!testCase) return
                const test = testCase.tests.find(el => el.id === selectedTest)
                if (!test) return
                const answer = test.answers.find(el => el.id === answerId)
                if (!answer) return
                if (answer[field] === value) return
                test.draft = true
                answer[field] = value
            })
        )
    }

    deleteAnswer = answerId => () => {
        const { selectedTestCase, selectedTest } = this.state
        this.props.removeAnswer(selectedTest, answerId).then(() => {
            this.setState(
                produce(this.state, draft => {
                    const testCase = draft.testCases.find(el => el.id === selectedTestCase)
                    if (!testCase) return
                    const test = testCase.tests.find(el => el.id === selectedTest)
                    if (!test) return
                    const answerIndex = test.answers.findIndex(el => el.id === answerId)
                    if (answerIndex === -1) return
                    test.answers.splice(answerIndex, 1)
                })
            )
        })
    }

    renderAnswerItem = (answer, index) => {
        return (
            <ListItem component="div" key={answer.id}>
                <ListItemContainer>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="primary"
                                checked={answer.isRight}
                                onChange={this.answerChanged(answer.id, 'isRight')}
                            />
                        }
                        label="Правильный"
                    />
                    <TextField
                        onChange={this.answerChanged(answer.id, 'content')}
                        label={'Название'}
                        variant="outlined"
                        fullWidth
                        value={answer.content}
                    />
                </ListItemContainer>
                <IconButton onClick={this.deleteAnswer(answer.id)}>
                    <Icon>delete</Icon>
                </IconButton>
            </ListItem>
        )
    }

    newAnswerChanged = field => (event, newValue) => {
        let value = event.target.value
        if (field === 'isRight') value = newValue
        this.setState(
            produce(this.state, draft => {
                draft.answer[field] = value
            })
        )
    }

    addAnswer = () => {
        const { answer, selectedTest, selectedTestCase } = this.state
        this.setState(
            produce(this.state, draft => {
                const testCase = draft.testCases.find(el => el.id === selectedTestCase)
                if (!testCase) return
                const test = testCase.tests.find(el => el.id === selectedTest)
                if (!test) return
                test.draft = true
                test.answers.push(answer)
                draft.answer = { isRight: false, content: '' }
            }),
            () => this.updateTestCase(selectedTestCase)
        )
    }

    renderCreationItem = () => {
        const { description } = this.state
        return (
            <ListItem className="ignore-drag" component="div">
                <ListItemContainer>
                    <TextField
                        onChange={this.descriptionChanged}
                        label={'Добавить вопрос'}
                        variant="outlined"
                        fullWidth
                        value={description}
                    />
                </ListItemContainer>
                <IconButton type="submit">
                    <Icon>add</Icon>
                </IconButton>
            </ListItem>
        )
    }

    renderAnswerCreation = () => {
        const { answer } = this.state
        return (
            <ListItem component="div">
                <ListItemContainer>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="primary"
                                checked={answer.isRight}
                                onChange={this.newAnswerChanged('isRight')}
                            />
                        }
                        label="Правильный"
                    />
                    <TextField
                        onChange={this.newAnswerChanged('content')}
                        label={'Добавить ответ'}
                        variant="outlined"
                        fullWidth
                        value={answer.content}
                    />
                </ListItemContainer>
                <IconButton onClick={this.addAnswer}>
                    <Icon>add</Icon>
                </IconButton>
            </ListItem>
        )
    }

    renderQuestionItem = () => {
        const { selectedTestCase, selectedTest } = this.state
        const test = this.findTest()
        if (!test) return null
        return (
            <div>
                <FormControl variant="outlined">
                    <FormLabel component="legend">Тип вопроса</FormLabel>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color={'primary'}
                                    checked={test.type === 'PROGRAMMING'}
                                    value="PROGRAMMING"
                                    onChange={this.testTypeChanged}
                                />
                            }
                            label="Задача с программированием"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color={'primary'}
                                    checked={test.type === 'MULTI'}
                                    value="MULTI"
                                    onChange={this.testTypeChanged}
                                />
                            }
                            label="Мульти-ответы"
                        />
                    </FormGroup>
                </FormControl>
                <TextField
                    onChange={this.testChanged('name')}
                    label={'Название вопроса'}
                    variant="outlined"
                    value={test.name}
                    fullWidth
                    margin={'normal'}
                />
                <EvysQuill value={test.task} onChangeText={this.testChanged('task')} />
                {test.answers.map(this.renderAnswerItem)}
                {this.renderAnswerCreation()}
            </div>
        )
    }

    render() {
        const { testCases } = this.state
        if (!testCases)
            return (
                <div>
                    <LinearProgress />
                </div>
            )
        return (
            <Card marginTop={12}>
                <Button variant="outlined" color="primary" onClick={this.generatePDF}>
                    Сформировать PDF
                </Button>
                <form onSubmit={this.submitNewTestCase}>
                    <List
                        ref={ref => (this.list = ref)}
                        subheader={
                            <ListHeader component="div" className="ignore-drag" disableSticky>
                                Вопросы
                            </ListHeader>
                        }
                        component="ul"
                    >
                        {testCases.map(this.renderTestCase)}
                        {this.renderCreationItem()}
                    </List>
                </form>
            </Card>
        )
    }
}

export default withProviders(TestCaseProvider)(TestCases)
