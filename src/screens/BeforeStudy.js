import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CurrentCourseItem } from '../components/themes/CurrentCourseItem'
import { DataCard } from '../components/BeforeStudy/DataCard'
import { BeforeStudyWrapper, CardsBlock, IconsBlock, ThemeNameBlock } from '../components/styled/BeforeStudy'
import VideoIcon from '@material-ui/icons/Videocam'
import DescriptionIcon from '@material-ui/icons/Description'
import { H1 } from '../components/styled/common'
import CheckboxIcon from '@material-ui/icons/CheckBox'
import { loadCourseById, loadThemeById } from '../actions/CoursesActions'

class BeforeStudy extends Component {
    state = {
        course: null,
        theme: null
    }
    componentDidMount() {
        const course_id = this.props.match.params['course_id']
        const theme_id = this.props.match.params['theme_id']
        Promise.all([this.props.loadCourseById(course_id), this.props.loadThemeById(theme_id)]).then(
            responses => this.setState({ course: responses[0].data.data, theme: responses[1].data.data })
        )
    }

    render() {
        const {theme, course} = this.state
        return (
            <BeforeStudyWrapper>
                <CurrentCourseItem  name={course && course.subject && course.subject.subject}
                                    percent={course && course.progress}
                                    teacherName={course && course.owner}
                                    subscribeTo={course && course.billing_info && course.billing_info.ends_at}/>
                <ThemeNameBlock>
                    <H1>{theme && theme.theme && theme.theme.name}</H1>
                </ThemeNameBlock>
                <CardsBlock>
                    <DataCard
                        hasVideo={true}
                        name={'Теория'}
                        iconsBlock={
                            <div>
                                {theme && theme.theory && theme.theory.videos && <VideoIcon />}
                                <DescriptionIcon />
                            </div>
                        }
                    />
                    <DataCard
                        name={'Практика'}
                        iconsBlock={
                            <div>
                                <CheckboxIcon />
                            </div>
                        }
                    />
                </CardsBlock>
            </BeforeStudyWrapper>
        )
    }
}

const mapStateToProps = state => ({})

export default connect(
    mapStateToProps,
    { loadThemeById, loadCourseById }
)(BeforeStudy)
