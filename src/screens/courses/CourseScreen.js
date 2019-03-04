import React, { Component } from 'react'
import CoursesMixin, { CoursesProvider } from '../../mixins/student/CoursesRepository'
import { H2, H3, HorizontalCentered, Paper, WithVerticalMargin } from '../../components/styled/common'
import withProviders from '../../utils/withProviders'
import withRouter from 'react-router/es/withRouter'
import { studentTheme } from '../../utils/global_theme'
import { CourseHeaderContent } from '../../components/courses/CourseHeaderContent'
import { CourseInfoCard } from '../../components/courses/CourseInfoCard'
import { getCourseMaterials, getTariffInfo, getTariffRates, getTariffThemes, subscribeToTariff } from '../../api'
import { CorsesHeaderWrapper, CourseHeaderBlock, DescriptionWrapper } from '../../components/styled/courses'
import { CourseResults } from '../../components/courses/CourseResults'
import { CourseThemesTree } from '../../components/courses/CourseThemesTree'
import { CommentsBlock } from '../../components/courses/CommentsBlock'
import { withSnackbar } from 'notistack'
import { AccountProvider } from '../../mixins/student/AccountRepository'
import { CourseRequirements } from '../../components/courses/CourseRequirements'

class CourseScreen extends CoursesMixin(Component) {
    state = { tariff: {}, themes: [], rates: [] }

    componentDidMount() {
        this.courseId = this.props.match.params['course_id']
        if (!this.props.currentCourse || this.props.currentCourse.id !== this.courseId) {
            this.props.getCourseById(this.courseId).then(() => {
                this.getSubjectInfo()
            })
        } else {
            this.getSubjectInfo()
        }
    }

    getSubjectInfo = () => {
        const id = this.props.currentCourse && this.props.currentCourse.id
        if (!id) return
        Promise.all([getTariffInfo(id), getTariffThemes(id), getTariffRates(id)]).then(results =>
            this.setState({ tariff: results[0].data, themes: results[1].data, rates: results[2].data })
        )
    }

    subscribeToCourse = () => {
        subscribeToTariff(this.courseId)
            .then(response => {
                if (response.data.paymentUrl) {
                    window.open(response.data.paymentUrl)
                } else {
                    this.props.enqueueSnackbar('Вы успешно подписались на курс', { variant: 'success' })
                    this.getSubjectInfo()
                }
            })
            .catch(error => {})
    }

    getVideosCount = themes => themes.reduce((acc, cur) => acc + cur.mediaCount || 0, 0)

    render() {
        const { tariff, themes, rates } = this.state
        const {
            results,
            buys,
            amount,
            currency,
            duration,
            owner,
            name,
            description,
            averageRate,
            totalRate,
            subscribed,
            requirements
        } = tariff
        const { profileData } = this.props
        return (
            <HorizontalCentered direction={'column'}>
                <CourseHeaderBlock background={studentTheme.ACCENT_DARK} borderRadius={'5px'}>
                    <CorsesHeaderWrapper>
                        <CourseHeaderContent
                            title={name}
                            subtitle={description}
                            rating={averageRate}
                            ratingCount={totalRate}
                            buyersCount={buys}
                            author={owner}
                        />
                        <CourseInfoCard
                            amount={amount}
                            currency={currency}
                            duration={duration}
                            hasCourse={subscribed}
                            locale={profileData && profileData.locality}
                            videos={(themes && this.getVideosCount(themes)) || 0}
                            themes={themes.length}
                            onSubscribe={this.subscribeToCourse}
                        />
                    </CorsesHeaderWrapper>
                </CourseHeaderBlock>
                {results && results.length > 0 && <CourseResults results={results || []} />}
                <WithVerticalMargin margin={'20px'} align={'flex-start'}>
                    <H2>Содержание курса</H2>
                </WithVerticalMargin>
                <CourseThemesTree themes={themes || []} />
                {requirements && <CourseRequirements requirements={requirements} />}
                {description && (
                    <DescriptionWrapper margin={'20px'} align={'flex-start'}>
                        <H2>Описание</H2>
                        <H3>{description}</H3>
                    </DescriptionWrapper>
                )}
                <WithVerticalMargin margin={'20px'} align={'flex-start'}>
                    <H2>Отзывы</H2>
                </WithVerticalMargin>
                <CommentsBlock
                    rating={averageRate}
                    comments={rates && rates.results}
                    courseId={this.courseId}
                    onCommentSended={() => this.getSubjectInfo()}
                />
            </HorizontalCentered>
        )
    }
}

export default withRouter(withProviders(CoursesProvider, AccountProvider)(withSnackbar(CourseScreen)))
