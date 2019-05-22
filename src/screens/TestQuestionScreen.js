import React, { Component } from 'react'
import {
    CenteredContent,
    ColoredButton,
    ColumnFlexed,
    FullsizeCentered,
    H1,
    H2,
    H3,
    HorizontalCentered,
    StudentInput
} from '../components/styled/common'
import {
    AnimatedQuestion,
    AnswerBlank,
    AnswerText,
    QuestionBlank,
    QuestionsBlock,
    QuestionText,
    QuestionTitle,
    TextFade,
    TextTransition
} from '../components/styled/testQuestion'
import TestsMixin, { TestsProvider } from '../mixins/student/TestsRepository'
import withProviders from '../utils/withProviders'
import { getTestQuestion } from '../api'
import ReactQuill from 'react-quill'
import { studentTheme } from '../utils/global_theme'
import { withSnackbar } from 'notistack'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'

class TestQuestionScreen extends TestsMixin(Component) {
    state = {
        selectedAnswer: null,
        answerSent: false,
        correct: null,
        question: null,
        testFinished: false,
        textAnswer: ''
    }

    constructor(props) {
        super(props)
        this.themeId = this.props.match.params['theme_id']
        this.courseId = this.props.match.params['course_id']
    }

    componentDidMount() {
        this.mountTime = new Date().getTime()
        this.getTestBlockIdAndQuestion()
        this.addEnterListener()
    }

    componentWillUnmount() {
        removeEventListener('keypress', this.handleEnterPress)
    }

    getTestBlockIdAndQuestion = async () => {
        try {
            await this.props.startTestsSession(this.themeId)
        } catch (err) {
            if (err.response.data.status_code === 403) {
                this.props.enqueueSnackbar(err.response.data.description, { variant: 'error' })
                this.props.history.push('/app/courses')
            }
            return
        }
        this.getNextQuestion()
    }

    sendAnswer = text => {
        const answerTime = Math.floor((new Date().getTime() - this.mountTime) / 1000)
        this.mountTime = new Date().getTime()
        this.props
            .sendAnswer(this.themeId, {
                testBlock: this.props.testBlockId,
                answer: text,
                timeSpent: answerTime
            })
            .then(res => {
                const correct = res && res.data.answerData && res.data.answerData.isRight
                this.setState({ correct, answerSent: true })
                if (res.data.blockEnd && res.data.changeBlockId === null) {
                    this.setState({ testFinished: true })
                    return
                }
                this.state.textAnswer && this.getNextQuestion()
            })
    }

    getNextQuestion = () => {
        this.setState({ question: null, answerSent: false, selectedAnswer: null, textAnswer: '' })
        return getTestQuestion(this.themeId, { test_block: this.props.testBlockId }).then(res =>
            this.setState({ question: res.data })
        )
    }

    addEnterListener = () => {
        this.enterListener = addEventListener('keypress', this.handleEnterPress)
    }

    handleEnterPress = e => {
        if (e.keyCode === 13) {
            this.state.answerSent
                ? this.getNextQuestion()
                : this.state.selectedAnswer && this.sendAnswer(this.state.selectedAnswer)
        }
    }

    onTextAnswerChange = e => this.setState({ textAnswer: e.target.value })

    selectAnswer = text => {
        const { selectedAnswer } = this.state
        if (text === selectedAnswer) {
            this.sendAnswer(text)
        } else {
            this.setState({ selectedAnswer: text })
        }
    }

    goToTheme = () => this.props.history.push(`/app/course/${this.courseId}/theme/${this.themeId}`)

    quillWorks = value => this.setState({ value })

    renderCodeMirror = () => {
        const { textAnswer } = this.state
        return (
            <CenteredContent width={'85%'} direction={'column'} style={{ alignItems: 'center', marginTop: '18px' }}>
                <CodeMirror
                    onBeforeChange={(editor, data, value) => {
                        this.setState({ textAnswer: value })
                    }}
                    options={{
                        mode: 'javascript',
                        theme: 'dracula',
                        lineNumbers: true
                    }}
                    value={textAnswer}
                />
                <ColoredButton
                    color={studentTheme.ACCENT}
                    textColor={studentTheme.PRIMARY_LIGHT}
                    style={{ width: '180px', margin: '12px 0' }}
                    onClick={() => this.sendAnswer(textAnswer)}
                    disabled={!textAnswer}
                >
                    отправить
                </ColoredButton>
            </CenteredContent>
        )
    }

    renderManyAnswers = () => {
        const { question, selectedAnswer, answerSent, correct } = this.state
        if (question.type === 'PROGRAMMING') return this.renderCodeMirror()
        return question.answers.map(answer => (
            <AnswerBlank
                key={question.content}
                correct={answerSent && correct !== null && selectedAnswer === question.content ? correct : null}
                selected={question.content === selectedAnswer}
                onClick={() => (answerSent ? this.getNextQuestion() : this.selectAnswer(question.content))}
            >
                <AnswerText>{question.content}</AnswerText>
            </AnswerBlank>
        ))
    }

    renderOneAnswer = () => {
        const { testAnswer, question } = this.state
        if (question.type === 'PROGRAMMING') return this.renderCodeMirror()
        return (
            <CenteredContent width={'40%'} direction={'column'} style={{ alignItems: 'center', marginTop: '18px' }}>
                <H3>Введите ответ:</H3>
                <StudentInput onChange={this.onTextAnswerChange} />
                <ColoredButton
                    color={studentTheme.ACCENT}
                    textColor={studentTheme.PRIMARY_LIGHT}
                    style={{ width: '180px', margin: '12px 0' }}
                    onClick={() => this.sendAnswer(textAnswer)}
                    disabled={!textAnswer}
                >
                    отправить
                </ColoredButton>
            </CenteredContent>
        )
    }

    render() {
        const { question, selectedAnswer, correct, answerSent, testFinished } = this.state
        return testFinished ? (
            <FullsizeCentered>
                <ColumnFlexed align={'center'}>
                    <H1>Для данной темы больше нет тестов</H1>
                    <ColoredButton
                        color={studentTheme.ACCENT}
                        textColor={studentTheme.PRIMARY_LIGHT}
                        style={{ width: '180px', margin: '12px 0' }}
                        onClick={this.goToTheme}
                    >
                        вернуться в тему
                    </ColoredButton>
                </ColumnFlexed>
            </FullsizeCentered>
        ) : (
            <HorizontalCentered direction={'column'}>
                <AnimatedQuestion duration={500} height={'auto'}>
                    <QuestionBlank>
                        <QuestionTitle>
                            <H2>{question && question.name}</H2>
                        </QuestionTitle>
                        <QuestionText>
                            <TextFade in={!!question} timeout={200} unmountOnExit>
                                <ReactQuill
                                    value={question && question.task}
                                    readOnly
                                    modules={{
                                        toolbar: false
                                    }}
                                    style={{ color: studentTheme.TEXT_COLOR }}
                                    theme={'bubble'}
                                    onChange={this.quillWorks}
                                />
                            </TextFade>
                        </QuestionText>
                    </QuestionBlank>
                </AnimatedQuestion>
                <TextFade in={!!question} timeout={200} unmountOnExit>
                    <QuestionsBlock>
                        {question && question.answers && question.answers.length > 1 && this.renderManyAnswers()}
                        {question && question.answers && question.answers.length <= 1 && this.renderOneAnswer()}
                    </QuestionsBlock>
                </TextFade>
            </HorizontalCentered>
        )
    }
}

export default withProviders(TestsProvider)(withSnackbar(TestQuestionScreen))
