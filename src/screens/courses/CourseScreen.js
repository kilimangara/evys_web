import React, { Component } from 'react'
import CoursesMixin, { CoursesProvider } from '../../mixins/student/CoursesRepository'
import { ColumnFlexed, H1, H2, HorizontalCentered, RowFlexed } from '../../components/styled/common'
import { CourseHeader, CourseHeaderTextBlock } from '../../components/styled/courses'

class CourseScreen extends CoursesMixin(Component) {
    state = {}

    render() {
        const { title, subtitle } = this.state

        return (
            <HorizontalCentered>
                <CourseHeader>
                    <CourseHeaderTextBlock>
                        <ColumnFlexed>
                            <H1>{title}</H1>
                            <H2>{subtitle}</H2>
                            <RowFlexed> </RowFlexed>
                        </ColumnFlexed>
                    </CourseHeaderTextBlock>
                </CourseHeader>
            </HorizontalCentered>
        )
    }
}

export default withRouter(withProviders(CoursesProvider)(CoursesScreen))
