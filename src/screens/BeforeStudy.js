import React, { Component } from 'react'
import { CurrentCourseItem } from '../components/themes/CurrentCourseItem'
import { DataCard } from '../components/BeforeStudy/DataCard'
import { BeforeStudyWrapper, CardsBlock, ThemeNameBlock } from '../components/styled/BeforeStudy'
import VideoIcon from '@material-ui/icons/Videocam'
import DescriptionIcon from '@material-ui/icons/Description'
import { H1 } from '../components/styled/common'
import CheckboxIcon from '@material-ui/icons/CheckBox'
import withProviders from '../utils/withProviders'
import { CoursesProvider } from '../mixins/student/CoursesRepository'
import { withRouter } from 'react-router'

class BeforeStudy extends Component {
    state = {
        theme: null
    }
    componentDidMount() {
        this.courseId = this.props.match.params['course_id']
        this.themeId = this.props.match.params['theme_id']
        this.props.loadThemeById(this.themeId).then(response => this.setState({ theme: response }))
    }

    goToTheory = () => this.props.history.push(`/app/course/${this.courseId}/theme/${this.themeId}/theory`)

    goToPractice = () => this.props.history.push(`/app/course/${this.courseId}/theme/${this.themeId}/test`)

    render() {
        const { theme } = this.state
        const { currentCourse } = this.props
        return (
            <BeforeStudyWrapper>
                <CurrentCourseItem
                    name={currentCourse && currentCourse.subject && currentCourse.subject.subject}
                    percent={currentCourse && currentCourse.progress}
                    teacherName={currentCourse && currentCourse.owner}
                    subscribeTo={currentCourse && currentCourse.billingInfo && currentCourse.billingInfo.endsAt}
                />
                <ThemeNameBlock>
                    <H1>{theme && theme.theme && theme.theme.name}</H1>
                </ThemeNameBlock>
                <CardsBlock>
                    <DataCard
                        disabled={theme && !theme.theory}
                        hasVideo={true}
                        name={'Теория'}
                        iconsBlock={
                            <div>
                                {theme && theme.theory && theme.theory.videos && <VideoIcon />}
                                <DescriptionIcon />
                            </div>
                        }
                        onClick={() => this.goToTheory()}
                    />
                    <DataCard
                        name={'Практика'}
                        iconsBlock={
                            <div>
                                <CheckboxIcon />
                            </div>
                        }
                        onClick={() => this.goToPractice()}
                        disabled={theme && theme.tests && theme.tests.count === 0}
                    />
                </CardsBlock>
            </BeforeStudyWrapper>
        )
    }
}

export default withRouter(withProviders(CoursesProvider)(BeforeStudy))
