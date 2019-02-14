import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCurrentCourses, loadFinishedCourses } from '../../actions/CoursesActions'

import CourseItem from '../../components/courses/CourseItem'
import { CoursesScreenContainer, CoursesTab, CoursesTabs, CoursesWrapper } from '../../components/styled/courses'
import { Loader, LoaderWrapper } from '../../components/styled/common'
import withProviders from '../../utils/withProviders'
import SearchMixin, { SearchProvider } from '../../mixins/student/SearchRepository'
import SubjectItem from '../../components/subjects/SubjectItem'
import { withRouter } from 'react-router'

class SearchCoursesScreen extends SearchMixin(Component) {
    state = {
        courses: [],
        selectedTab: 0
    }

    componentDidMount() {
        const searchRegex = /\?search=([^&]*)&?([^&]*)/
        const queryString = this.props.location.search
        const searchText = queryString.match(searchRegex) && queryString.match(searchRegex)[1]
        if (searchText) {
            this.props.getSearchSubjects(searchText)
        } else {
            this.props.history.push('/app/student/subjects/all')
        }
    }

    goToThemes = id => {
        // this.props.history.push(`/app/course/${id}/themes`)
    }

    render() {
        const { loading, searchResults } = this.props
        return (
            <CoursesScreenContainer>
                {loading ? (
                    <LoaderWrapper>
                        <Loader />
                    </LoaderWrapper>
                ) : (
                    <CoursesWrapper>
                        {searchResults &&
                            searchResults.map(({ id, name, description, duration, subjects, owner, amount }) => (
                                <SubjectItem
                                    key={id}
                                    ended={false}
                                    name={name}
                                    teacherName={owner}
                                    subscribeTo={null}
                                    courseImage={subjects && subjects[0] && subjects[0].image}
                                    amount={amount}
                                    onClick={() => this.goToThemes(id)}
                                />
                            ))}
                    </CoursesWrapper>
                )}
            </CoursesScreenContainer>
        )
    }
}

export default withRouter(withProviders(SearchProvider)(SearchCoursesScreen))
