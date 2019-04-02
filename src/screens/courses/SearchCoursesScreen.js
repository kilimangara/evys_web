import React, { Component } from 'react'

import { CoursesScreenContainer, CoursesWrapper } from '../../components/styled/courses'
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
        this.searchForText()
    }

    goToCourse = id => {
        this.props.history.push(`/app/course/${id}`)
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.searchForText()
        }
    }

    searchForText = () => {
        const searchRegex = /\?search=([^&]*)&?([^&]*)/
        const queryString = this.props.location.search
        const searchText = queryString.match(searchRegex) && queryString.match(searchRegex)[1]
        if (searchText) {
            this.props.getSearchSubjects(searchText)
        } else {
            this.props.history.push('/app/courses/all')
        }
    }

    render() {
        const { searchFetching, searchResults } = this.props
        return (
            <CoursesScreenContainer>
                {searchFetching ? (
                    <LoaderWrapper>
                        <Loader />
                    </LoaderWrapper>
                ) : (
                    <CoursesWrapper>
                        {searchResults &&
                            searchResults.map(
                                ({ id, name, description, duration, subjects, owner, amount, currency }) => (
                                    <SubjectItem
                                        key={id}
                                        ended={false}
                                        name={name}
                                        teacherName={owner}
                                        subscribeTo={null}
                                        courseImage={
                                            subjects[0].mainImage ||
                                            (subjects[0].category && subjects[0].category.image)
                                        }
                                        duration={duration}
                                        amount={amount}
                                        currency={currency}
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

export default withRouter(withProviders(SearchProvider)(SearchCoursesScreen))
