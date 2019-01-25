import React, { Component } from 'react'
import { H2, H3, HorizontalCentered, Paper } from '../components/styled/common'
import { AnswerBlank, QuestionBlank, QuestionsBlock } from '../components/styled/testQuestion'
import TestsMixin, { TestsProvider } from '../mixins/student/TestsRepository'
import withProviders from '../utils/withProviders'
import { CoursesProvider } from '../mixins/student/CoursesRepository'

class TestQuestionScreen extends TestsMixin(Component) {
    state = {
        question: "What the fuck is this shit? Can someone tell me please? i'm so fucking mad right now",
        answers: [
            { content: 'Idk bro' },
            { content: 'u mad bro??' },
            { content: 'this is bullshit man...' },
            { content: 'zlain pesos ' }
        ],
        selectedAnswer: null
    }

    constructor(props){
        super(props)
        this.themeId = this.props.match.params['theme_id']
        this.courseId = this.props.match.params['course_id']
    }

    componentDidMount() {
        console.log(123)
        this.props.startTestsSession(this.themeId)
    }

    selectAnswer = text => {
        const { selectedAnswer } = this.state
        this.setState({ selectedAnswer: selectedAnswer === text ? null : text })
    }

    render() {
        const { question, answers, selectedAnswer } = this.state
        return (
            <HorizontalCentered direction={'column'}>
                <QuestionBlank>
                    <H2>{question}</H2>
                </QuestionBlank>
                <QuestionsBlock>
                    {answers.map(question => (
                        <AnswerBlank
                            selected={question.content === selectedAnswer}
                            onClick={() => this.selectAnswer(question.content)}
                        >
                            <H3>{question.content}</H3>
                        </AnswerBlank>
                    ))}
                </QuestionsBlock>
            </HorizontalCentered>
        )
    }
}

export default withProviders(TestsProvider)(TestQuestionScreen)
