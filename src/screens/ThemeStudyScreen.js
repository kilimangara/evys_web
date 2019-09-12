import React, { Component } from 'react'
import { BorderedImage, CenteredContent, HorizontalCentered, Loader } from '../components/styled/common'
import { ThemeStudyTextBlock } from '../components/styled/themes'
import { ThemeStudyTheoryItem } from '../components/themes/ThemeStudyTheoryItem'
import Icon from '@material-ui/core/Icon'
import withProviders from '../utils/withProviders'
import { CoursesProvider } from '../mixins/student/CoursesRepository'
import { withSnackbar } from 'notistack'

class ThemeStudyScreen extends Component {
    state = {
        theme: null,
        theory: null,
        videos: null
    }

    constructor(props) {
        super(props)
        this.themeId = this.props.match.params['theme_id']
        this.courseId = this.props.match.params['course_id']
    }

    componentDidMount() {
        Promise.all([this.props.loadThemeById(this.themeId), this.props.loadTheoryByThemeId(this.themeId)])
            .then(responses => {
                if (responses[0] && responses[0].theory.videos) {
                    this.props.loadThemeVideos(this.themeId).then(response => {
                        this.setState({ videos: response })
                    })
                }
                this.setState({ theme: responses[0], theory: responses[1] })
            })
            .catch(err => {
                if (err.response.data.status_code === 403) {
                    this.props.enqueueSnackbar(err.response.data.description, { variant: 'error' })
                    this.props.history.push('/app/courses')
                }
            })
    }

    createMarkup = markup => {
        return { __html: markup }
    }

    onVideoClick = id =>
        this.props.history.push(`/app/course/${this.courseId}/theme/${this.themeId}/theory/videos/${id}`)

    render() {
        const { theory, videos } = this.state
        const { coursesFetching } = this.props

        return coursesFetching ? (
            <CenteredContent height={'100%'}>
                <Loader />
            </CenteredContent>
        ) : (
            <HorizontalCentered direction={'column'}>
                <ThemeStudyTextBlock>
                    <div dangerouslySetInnerHTML={theory && theory.text && this.createMarkup(theory.text)} />
                </ThemeStudyTextBlock>
                {videos &&
                    videos.length &&
                    videos.map(({ id, name, youtubeVideo }) => (
                        <ThemeStudyTheoryItem
                            key={id}
                            alias={name}
                            onClick={() => this.onVideoClick(id)}
                            iconComponent={
                                <BorderedImage
                                    width={'200px'}
                                    height={'110px'}
                                    image={`http://img.youtube.com/vi/${new URL(youtubeVideo).searchParams.get(
                                        'v'
                                    )}/sddefault.jpg`}
                                />
                            }
                        />
                    ))}
                {theory && theory.files && (
                    <ThemeStudyTheoryItem alias={'Текстовый файл'} iconComponent={<Icon>description</Icon>} />
                )}
            </HorizontalCentered>
        )
    }
}

export default withProviders(CoursesProvider)(withSnackbar(ThemeStudyScreen))
