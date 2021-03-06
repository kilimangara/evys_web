import React, { Component } from 'react'
import HoverPaper from '../common/HoverPaper'
import moment from 'moment'
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
    ProgressRingContainer,
    OutdatedWrapper,
    OutdatedText,
    GrayscaleContent
} from '../styled/courses'

class CourseItem extends Component {
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
        const { courseImage, name, teacherName, subscribeTo, percent, ended, onClick, disabled } = this.props
        return (
            <CourseWrapper>
                {ended && (
                    <OutdatedWrapper>
                        <OutdatedText>Истек ({this.renderExpireDate(subscribeTo)})</OutdatedText>
                    </OutdatedWrapper>
                )}
                <GrayscaleContent isOn={ended}>
                    <HoverPaper
                        width={'100%'}
                        height={'100%'}
                        background={studentTheme.PRIMARY_LIGHT}
                        borderRadius={'15px'}
                        clickable
                        disabled={disabled}
                        onClick={() => onClick()}
                    >
                        <CourseImage src={courseImage} />
                        <CourseInfo>
                            <TextInfo>
                                <CourseName>{name}</CourseName>
                                <div>{teacherName}</div>
                                {!ended && <CourseExpireDate>{this.renderExpireDate(subscribeTo)}</CourseExpireDate>}
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
                        </CourseInfo>
                    </HoverPaper>
                </GrayscaleContent>
            </CourseWrapper>
        )
    }
}

export default CourseItem
