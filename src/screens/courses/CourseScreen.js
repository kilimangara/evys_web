import React, { Component } from 'react'
import CoursesMixin, { CoursesProvider } from '../../mixins/student/CoursesRepository'
import { H2, HorizontalCentered, Paper } from '../../components/styled/common'
import withProviders from '../../utils/withProviders'
import withRouter from 'react-router/es/withRouter'
import { studentTheme } from '../../utils/global_theme'
import { CourseHeaderContent } from '../../components/courses/CourseHeaderContent'
import { CourseInfoCard } from '../../components/courses/CourseInfoCard'
import { getCourseMaterials, getTariffInfo, getTariffRates, getTariffThemes } from '../../api'
import { CorsesHeaderWrapper, CourseHeaderBlock } from '../../components/styled/courses'
import { CourseResults } from '../../components/courses/CourseResults'
import { CourseThemesTree } from '../../components/courses/CourseThemesTree'

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
        const id = this.props.currentCourse && this.props.currentCourse.subject.id
        Promise.all([getTariffInfo(id), getTariffThemes(id), getTariffRates(id)]).then(results =>
            this.setState({ tariff: results[0].data, themes: results[1].data, rates: results[2] })
        )
    }

    makeTreeFromThemes = themes => {
        const parentMap = {}

        themes.forEach(theme => {
            parentMap[theme.parentThemeId] =
                parentMap[theme.parentThemeId] && parentMap[theme.parentThemeId].length
                    ? [...parentMap[theme.parentThemeId], theme.id]
                    : [theme.id]
        })
    }

    getVideosCount = themes => themes.reduce((acc, cur) => acc + cur.mediaCount || 0, 0)

    render() {
        const { tariff, themes, rates } = this.state
        let {
            results = [
                'писка вырастет станет огромная',
                'будешь сильный смелый красивый',
                'вот тут надо бы текст побольше чтобы было понятно как ведет себя при переносе строк',
                'а вообще сложный конечно экранчик этот, гемора с ним много',
                'текст текст текст текст текст текст текст текст текст текст текст текст',
                'лдавыофдлао фывдла фылвао фывлаофж ылвоафжлвыао фыжлвоа джловфыад жлфыовалд офыва длофыжад лофывжла о',
                'ыфва фыва фыавлф оыадлоыаджл оывадлж офывждлаофы жвлофыв ларфылоарлф ыовдфытва лфыовалфд оытвдфоыва л'
            ],
            buys = 0,
            amount = '228',
            currency = 'RUB',
            duration = '30',
            owner,
            name,
            description,
            averageRate,
            totalRate
        } = tariff
        const { locale } = this.props
        results = [
            'писка вырастет станет огромная',
            'будешь сильный смелый красивый',
            'вот тут надо бы текст побольше чтобы было понятно как ведет себя при переносе строк',
            'а вообще сложный конечно экранчик этот, гемора с ним много',
            'текст текст текст текст текст текст текст текст текст текст текст текст',
            'лдавыофдлао фывдла фылвао фывлаофж ылвоафжлвыао фыжлвоа джловфыад жлфыовалд офыва длофыжад лофывжла о',
            'ыфва фыва фыавлф оыадлоыаджл оывадлж офывждлаофы жвлофыв ларфылоарлф ыовдфытва лфыовалфд оытвдфоыва л'
        ]
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
                            locale={locale}
                            videos={(themes && this.getVideosCount(themes)) || 0}
                            themes={themes.length}
                        />
                    </CorsesHeaderWrapper>
                </CourseHeaderBlock>
                <CourseResults results={results || []} />
                <CourseThemesTree themes={themes || []} />
            </HorizontalCentered>
        )
    }
}

export default withRouter(withProviders(CoursesProvider)(CourseScreen))
