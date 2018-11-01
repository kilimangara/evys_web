import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import HoverPaper from '../common/HoverPaper'
import moment from 'moment'
import $clamp from 'clamp-js'
import { studentTheme } from '../../utils/global_theme'
import {CourseImage, CourseInfo, TextInfo} from "../styled/courses";

class CourseItem extends Component {
    state = {
        hover: false
    }

    changeHovered = hover => {
        this.setState({ hover })
    }

    render() {
        const {imgSrc, name, teacherName} = this.props
        console.log(name)
        return (
            <HoverPaper height={'300px'} width={'350px'} background={studentTheme.PRIMARY_LIGHT} borderRadius={'15px'}>
                <CourseImage src={imgSrc} />
            <CourseInfo>
                <TextInfo>
                    <div>
                        {$clamp(<div>${name}</div>, 2)}
                    </div>
                    <div>
                        {teacherName}
                    </div>
                </TextInfo>
            </CourseInfo>
            </HoverPaper>
        )
    }
}

CourseItem.defaultProps = {
    active: true,
    name: 'Тест',
    percent: 50,
    teacherName: '',
    subscribeTo: '2018-07-18T20:59:59.999Z',
    courseImage: 'https://respectbet.com/upload/articles/59d7a723718e7.jpg'
}

export default CourseItem
