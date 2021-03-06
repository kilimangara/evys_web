import React from 'react'
import ThemesRepository, { ThemeProvider } from '../../../mixins/admin/ThemesRepository'
import withNav, { NavigationProvider } from '../../../mixins/admin/NavigatableComponent'
import { YoutubeProvider } from '../../../mixins/admin/YoutubeProvider'
import withProviders from '../../../utils/withProviders'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import { theme } from '../../../utils/global_theme'
import produce from 'immer'
import LinearProgress from '@material-ui/core/LinearProgress'
import SaveButton from '../../../components/common/SaveButton'
import { Route } from 'react-router'
import TheoryView from './theory-view'
import TestCasesView from './test-cases'
import ThemeSettings from './theme-settings'
import accountBlockedHOC from '../../../mixins/admin/AccountBlockedHOC'
import { compose } from 'recompose'

const Container = styled.div`
    display: flex;
    padding: 24px 12px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
`

export const ListHeader = styled(ListSubheader)`
    font-weight: 600;
    font-size: 18px;
    color: black;
`

export const ListText = styled(ListItemText)`
    & > span {
        padding-left: 20px;
    }
`

export const Card = styled.div`
    margin-top: ${({ marginTop = 0 }) => `${marginTop}px`};
    border: 1px solid rgba(0, 0, 0, 0.12);
    background-color: white;
    box-shadow: 0 0 1px #bdbfc1, 0 1px #ced2d3;
    padding: 12px;
`

const ColoredButton = styled(Button)`
    background-color: ${theme.ACCENT_COLOR};
    color: white;
`

class ThemeScreen extends ThemesRepository(withNav(React.Component)) {
    state = {
        errors: {}
    }

    componentDidMount() {
        this.getTheme()
        this.getTheory()
    }

    componentDidUpdate(prevProps) {
        if (this.props.theme !== prevProps.theme) {
            this.setState({ theme: this.props.theme })
            this.reloadNavigation()
        }
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.reloadNavigation()
        }
    }

    reloadNavigation = () =>
        this.changeNavigation({
            header: `Тема ${this.props.theme.name}`,
            backUrl: `/admin/subjects/${this.props.theme.subject}`
        })

    themeUpdated = theme => {
        this.setState({ theme })
    }

    theoryUpdated = theory => {
        this.setState({ theory })
    }

    saveTheme = () => {
        return this.updateTheme()
            .then(() => this.setState({ errors: {} }))
            .catch(err => {
                const { response } = err
                if (response.status === 400) this.setState({ errors: response.data })
                throw err
            })
    }

    saveTheory = () => {
        console.log('save theory', this.state.theory)
        return this.props.saveTheory(this.themeId(), this.state.theory).then(this.getTheory)
    }

    isHidden = () => this.state.theme.isHidden

    changeVisibility = () => {
        const { theme } = this.state
        this.state = produce(this.state, draft => {
            draft.theme.isHidden = !draft.theme.isHidden
        })
        this.saveTheme()
    }

    goToAddVideo = () => {
        const { theory } = this.state
        if (!theory.id) return
        this.props.history.push(`/admin/storage/${this.themeId()}/add_video?theory_id=${theory.id}`)
    }

    renderTheory = () => {
        const { theory, videos } = this.state
        return (
            <TheoryView
                theory={theory}
                videos={videos}
                updateTheory={this.theoryUpdated}
                theorySaved={this.saveTheory}
                youtubeSigned={this.props.isSigned}
                goToAddVideo={this.goToAddVideo}
            />
        )
    }

    onThemeUpdate = theme => {
        this.setState({ theme })
    }

    renderTheme = () => {
        const { theme } = this.state
        const { themesFetching } = this.props
        return (
            <ThemeSettings
                fetching={themesFetching}
                theme={theme}
                saveTheme={this.saveTheme}
                onThemeUpdate={this.onThemeUpdate}
            />
        )
    }

    goTo = type => () => {
        switch (type) {
            case 'root':
                return this.props.history.replace(`/admin/themes/${this.themeId()}`)
            case 'theory':
                return this.props.history.replace(`/admin/themes/${this.themeId()}/theory`)
            case 'tests':
                return this.props.history.replace(`/admin/themes/${this.themeId()}/tests`)
        }
    }

    render() {
        const { theme } = this.state
        if (!theme)
            return (
                <div>
                    <LinearProgress />
                </div>
            )
        return (
            <Container>
                <Card>
                    <List subheader={<ListHeader disableSticky>Настройки темы</ListHeader>} component="nav">
                        <ListItem button onClick={this.goTo('root')}>
                            <ListText primary="Основные настройки" />
                        </ListItem>
                        <ListItem button onClick={this.goTo('theory')}>
                            <ListText primary="Теория" />
                        </ListItem>
                        <ListItem button onClick={this.goTo('tests')}>
                            <ListText primary="Вопросы" />
                        </ListItem>
                        <Divider />
                        <div style={{ marginLeft: 16, marginTop: 8 }}>
                            <ColoredButton type="contained" margin="normal" onClick={this.changeVisibility}>
                                {this.isHidden() ? 'Опубликовать тему' : 'Скрыть тему'}
                            </ColoredButton>
                        </div>
                    </List>
                </Card>
                <Route exact path="/admin/themes/:themeId(\d+)" render={this.renderTheme} />
                <Route exact path="/admin/themes/:themeId(\d+)/theory" render={this.renderTheory} />
                <Route exact path="/admin/themes/:themeId(\d+)/tests" component={TestCasesView} />
            </Container>
        )
    }
}

const enhance = compose(
    accountBlockedHOC,
    withProviders(ThemeProvider, YoutubeProvider, NavigationProvider)
)

export default enhance(ThemeScreen)
