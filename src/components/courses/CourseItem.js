import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import HoverPaper from '../common/HoverPaper'
import moment from 'moment'
import $clamp from 'clamp-js'
import { studentTheme } from '../../utils/global_theme'
import CircularProgressbar from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {
    CourseImage,
    CourseInfo,
    CourseName,
    TextInfo,
    CourseExpireDate,
    CourseWrapper,
    ProgressRingContainter
} from '../styled/courses'

class CourseItem extends Component {
    state = {
        hover: false
    }

    changeHovered = hover => {
        this.setState({ hover })
    }

    render() {
        const { courseImage, name, teacherName, subscribeTo, percent } = this.props
        return (
            <CourseWrapper>
                <HoverPaper
                    width={'100%'}
                    height={'100%'}
                    background={studentTheme.PRIMARY_LIGHT}
                    borderRadius={'15px'}
                >
                    <CourseImage src={courseImage} />
                    <CourseInfo>
                        <TextInfo>
                            <CourseName>{name}</CourseName>
                            <div>{teacherName}</div>
                            <CourseExpireDate>до {moment(subscribeTo).format('DD.MM.YYYY')}</CourseExpireDate>
                        </TextInfo>
                        <ProgressRingContainter>
                            <CircularProgressbar
                                percentage={percent}
                                text={`${percent}%`}
                                styles={{
                                    path: { stroke: studentTheme.ACCENT },
                                    trail: { stroke: 'transparent' },
                                    text: {
                                        fill: studentTheme.ACCENT,
                                        fontSize: '16pt',
                                        fontWeight: 600,
                                        fontFamily: studentTheme.FONT
                                    }
                                }}
                                counterClockwise
                            />
                        </ProgressRingContainter>
                    </CourseInfo>
                </HoverPaper>
            </CourseWrapper>
        )
    }
}

CourseItem.defaultProps = {
    active: true,
    name: 'Тестовое название',
    percent: Math.floor(Math.random() * 100),
    teacherName: 'Фамилия И.О.',
    subscribeTo: '2018-07-18T20:59:59.999Z',
    courseImage: 'https://respectbet.com/upload/articles/59d7a723718e7.jpg'
}

export default CourseItem
