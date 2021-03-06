import React, { Component } from 'react'
import { CoursesScreenContainer, CoursesWrapper } from '../../components/styled/courses'
import { Loader, LoaderWrapper } from '../../components/styled/common'
import withProviders from '../../utils/withProviders'
import SearchMixin, { SearchProvider } from '../../mixins/student/SearchRepository'
import SubjectItem from '../../components/subjects/SubjectItem'
import { AccountProvider } from '../../mixins/student/AccountRepository'

class AllCoursesScreen extends SearchMixin(Component) {
    state = {
        courses: [],
        selectedTab: 0
    }

    componentDidMount = () => {
        this.props.getAllSubjects()
    }

    goToCourse = id => {
        this.props.history.push(`/app/course/${id}`)
    }

    render() {
        const { searchFetching, subjectsList, profileData } = this.props
        return (
            <CoursesScreenContainer>
                {searchFetching ? (
                    <LoaderWrapper>
                        <Loader />
                    </LoaderWrapper>
                ) : (
                    <CoursesWrapper>
                        {subjectsList &&
                            subjectsList.map(
                                ({ id, name, description, duration, subjects, owner, amount, currency }) => (
                                    <SubjectItem
                                        key={id}
                                        ended={false}
                                        name={name}
                                        teacherName={owner}
                                        subscribeTo={null}
                                        courseImage={subjects[0].category && subjects[0].category.image}
                                        amount={amount}
                                        currency={currency}
                                        duration={duration}
                                        locale={profileData && profileData.locality}
                                        onClick={() => this.goToCourse(id)}
                                    />
                                )
                            )}
                    </CoursesWrapper>
                )}
            </CoursesScreenContainer>
        )
    }
}

export default withProviders(SearchProvider, AccountProvider)(AllCoursesScreen)
