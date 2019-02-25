import React, { Component } from 'react'
import HoverPaper from '../common/HoverPaper'
import moment from 'moment'
import { studentTheme } from '../../utils/global_theme'
import CircularProgressbar from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { CourseImage, CourseInfo, CourseName, CourseExpireDate, CourseWrapper } from '../styled/courses'
import { CurrentCourseInfo, CurrentCourseWrapper, ProgressRingContainer, TextInfo } from '../styled/themes'

export class CurrentCourseItem extends Component {
    state = {
        hover: false
    }

    changeHovered = hover => {
        this.setState({ hover })
    }

    renderExpireDate(subscribeTo) {
        if (subscribeTo) return `до ${moment(subscribeTo).format('DD.MM.YYYY')}`
        return 'Бесконечный доступ'
    }

    colorByPercent(percent) {
        if (!percent) return 'white'
        else return studentTheme.ACCENT
    }

    render() {
        const { courseImage, name, teacherName, subscribeTo, percent } = this.props
        return (
            <CurrentCourseWrapper>
                <HoverPaper
                    width={'calc(100% - 24px)'}
                    height={'100%'}
                    background={`linear-gradient(to right, ${studentTheme.COURSE_GRADIENT_LEFT}, ${
                        studentTheme.COURSE_GRADIENT_RIGHT
                    })`}
                    borderRadius={'15px'}
                    style={{ margin: '0 12px' }}
                >
                    <CurrentCourseInfo>
                        <TextInfo>
                            <CourseName>{name}</CourseName>
                            <div>{teacherName}</div>
                            <CourseExpireDate>{this.renderExpireDate(subscribeTo)}</CourseExpireDate>
                        </TextInfo>
                        <ProgressRingContainer>
                            <CircularProgressbar
                                percentage={percent}
                                text={`${percent}%`}
                                styles={{
                                    path: { stroke: this.colorByPercent(percent) },
                                    trail: { stroke: 'transparent' },
                                    text: {
                                        fill: this.colorByPercent(percent),
                                        fontSize: '16pt',
                                        fontWeight: 600,
                                        fontFamily: studentTheme.FONT
                                    }
                                }}
                                counterClockwise
                            />
                        </ProgressRingContainer>
                    </CurrentCourseInfo>
                </HoverPaper>
            </CurrentCourseWrapper>
        )
    }
}

CurrentCourseItem.defaultProps = {
    active: true,
    name: 'Тестовое название',
    percent: Math.floor(Math.random() * 100),
    teacherName: 'Фамилия И.О.',
    subscribeTo: '2018-07-18T20:59:59.999Z',
    courseImage: 'https://respectbet.com/upload/articles/59d7a723718e7.jpg'
}
