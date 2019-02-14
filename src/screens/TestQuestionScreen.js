import React, { Component } from 'react'
import { CenteredContent, H2, H3, HorizontalCentered, Paper } from '../components/styled/common'
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
import { CoursesProvider } from '../mixins/student/CoursesRepository'
import { getTestQuestion } from '../api'
import { startTestsSession } from '../reducers/student/tests'
import ReactQuill from 'react-quill'
import { studentTheme } from '../utils/global_theme'
import { CSSTransition } from 'react-transition-group'
import AnimateHeight from 'react-animate-height'

class TestQuestionScreen extends TestsMixin(Component) {
    state = {
        selectedAnswer: null,
        answerSended: false,
        correct: null,
        question: null
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
        await this.props.startTestsSession(this.themeId)
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
                this.setState({ correct, answerSended: true })
            })
    }

    getNextQuestion = () => {
        this.setState({ question: null, answerSended: false, selectedAnswer: null })
        return getTestQuestion(this.themeId, { test_block: this.props.testBlockId }).then(res =>
            this.setState({ question: res.data })
        )
    } // TODO: why camelCase method doesn't work?

    addEnterListener = () => {
        addEventListener('keypress', e => {
            if (e.keyCode === 13) {
                this.state.answerSended
                    ? this.getNextQuestion()
                    : this.state.selectedAnswer && this.sendAnswer(this.state.selectedAnswer)
            }
        })
    }

    selectAnswer = text => {
        const { selectedAnswer } = this.state
        if (text === selectedAnswer) {
            this.sendAnswer(text)
        } else {
            this.setState({ selectedAnswer: text })
        }
    }

    quillWorks = value => this.setState({ value })

    render() {
        const { question, selectedAnswer, correct, answerSended } = this.state
        const { testFinished } = this.props
        return testFinished ? (
            <CenteredContent>PIZDEC</CenteredContent>
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
                            question.answers.map(question => {
                                return (
                                    <AnswerBlank
                                        key={question.content}
                                        correct={
                                            answerSended && correct !== null && selectedAnswer === question.content
                                                ? correct
                                                : null
                                        }
                                        selected={question.content === selectedAnswer}
                                        onClick={() =>
                                            answerSended ? this.getNextQuestion() : this.selectAnswer(question.content)
                                        }
                                    >
                                        <H3>{question.content}</H3>
                                    </AnswerBlank>
                                )
                            })}
                    </QuestionsBlock>
                </TextFade>
            </HorizontalCentered>
        )
    }
}

export default withProviders(TestsProvider)(TestQuestionScreen)
