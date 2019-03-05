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

class TestQuestionScreen extends TestsMixin(Component) {
    state = {
        selectedAnswer: null,
        answerSent: false,
        correct: null,
        question: null,
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
        addEventListener('keypress', e => {
            if (e.keyCode === 13) {
                this.state.answerSent
                    ? this.getNextQuestion()
                    : this.state.selectedAnswer && this.sendAnswer(this.state.selectedAnswer)
            }
        })
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

    render() {
        const { question, selectedAnswer, correct, answerSent, textAnswer } = this.state
        const { testFinished } = this.props
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
                        {question &&
                            question.answers &&
                            (question.answers.length > 1 ? (
                                question.answers.map(question => {
                                    return (
                                        <AnswerBlank
                                            key={question.content}
                                            correct={
                                                answerSent && correct !== null && selectedAnswer === question.content
                                                    ? correct
                                                    : null
                                            }
                                            selected={question.content === selectedAnswer}
                                            onClick={() =>
                                                answerSent
                                                    ? this.getNextQuestion()
                                                    : this.selectAnswer(question.content)
                                            }
                                        >
                                            <H3>{question.content}</H3>
                                        </AnswerBlank>
                                    )
                                })
                            ) : (
                                <CenteredContent
                                    width={'40%'}
                                    direction={'column'}
                                    style={{ alignItems: 'center', marginTop: '18px' }}
                                >
                                    <H3>Введите ответ:</H3>
                                    <StudentInput onChange={e => this.onTextAnswerChange(e)} />
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
                            ))}
                    </QuestionsBlock>
                </TextFade>
            </HorizontalCentered>
        )
    }
}

export default withProviders(TestsProvider)(withSnackbar(TestQuestionScreen))
