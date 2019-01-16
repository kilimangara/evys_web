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
import withProviders from "../utils/withProviders";
import {CoursesProvider} from "../mixins/student/CoursesRepository";

class BeforeStudy extends Component {
    state = {
        theme: null
    }
    componentDidMount() {
        const courseId = this.props.match.params['course_id']
        const themeId = this.props.match.params['theme_id']
        Promise.all([this.props.getCourseById(courseId), this.props.loadThemeById(themeId)]).then(
            responses => this.setState({ theme: responses[1].data.data })
        )
    }

    render() {
        const {theme} = this.state
        const {currentCourse} = this.props
        return (
            <BeforeStudyWrapper>
                <CurrentCourseItem  name={currentCourse && currentCourse.subject && currentCourse.subject.subject}
                                    percent={currentCourse && currentCourse.progress}
                                    teacherName={currentCourse && currentCourse.owner}
                                    subscribeTo={currentCourse && currentCourse.billingInfo && currentCourse.billingInfo.endsAt}/>
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

// const mapStateToProps = state => ({})
//
// export default connect(
//     mapStateToProps,
//     { loadThemeById, loadCourseById }
// )(BeforeStudy)

export default withProviders(CoursesProvider)(BeforeStudy)
