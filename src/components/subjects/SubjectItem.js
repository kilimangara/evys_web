import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
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
    GrayscaleContent,
    SubjectPriceContainer
} from '../styled/courses'

class SubjectItem extends Component {
    state = {
        hover: false
    }

    changeHovered = hover => {
        this.setState({ hover })
    }

    render() {
        const { courseImage, name, teacherName, amount, onClick } = this.props
        return (
            <CourseWrapper onClick={() => onClick()}>
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
                        </TextInfo>
                        <SubjectPriceContainer>
                            {amount}
                            руб.\мес.
                        </SubjectPriceContainer>
                    </CourseInfo>
                </HoverPaper>
            </CourseWrapper>
        )
    }
}

export default SubjectItem
