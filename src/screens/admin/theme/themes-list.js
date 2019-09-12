import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'reboron/ScaleModal'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'
import ThemesRepository, { ThemeProvider } from '../../../mixins/admin/ThemesRepository'
import withProviders from '../../../utils/withProviders'
import ThemeCreation from '../../../components/themes/ThemeCreation'
import LinearProgress from '@material-ui/core/LinearProgress'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import { ListHeader, ListText, Card } from './index'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Sortable from 'sortablejs'
import { withSnackbar } from 'notistack'

const Visibility = () => <Icon>visibility</Icon>
const VisibilityOff = () => <Icon>visibility_off</Icon>

const ListItemContainer = styled.div`
    padding-left: 8px;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const NoThemesWrapper = styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const NoThemesText = styled(Typography)`
    font-weight: 300;
    font-size: 22px;
    text-align: center;
    color: black;
`

class ThemesScreen extends ThemesRepository(Component) {
    state = {
        page: 1
    }

    componentDidMount() {
        this.reloadList()
    }

    reloadList = () => {
        this.props.resetThemesList()
        this.props.loadThemes(this.subjectId(), {
            parentTheme: this.parentId()
        })
    }

    componentDidUpdate(prevProps) {
        const prevParentId = new URLSearchParams(prevProps.location.search).get('parent')
        if (this.parentId() !== prevParentId) this.reloadList()
        if (this.props.themes.length && !this.props.themesFetching) {
            const listElement = ReactDOM.findDOMNode(this.list)
            const sortable = new Sortable(listElement, {
                handle: '.sortable-handle',
                filter: '.ignore-drag',
                onEnd: this.updateVariantPositions
            })
        }
    }

    updateTheme = (themeId, data) => {
        return this.props.changeTheme(themeId, data)
    }

    updateVariantPositions = event => {
        const { oldIndex, newIndex } = event
        console.log(oldIndex, newIndex)
        const theme = this.props.themes[oldIndex - 1]
        if (!theme) return
        this.updateTheme(theme.id, { num: newIndex })
    }

    goToTheme = theme => () => {
        if (theme.type === 'Theme') this.props.history.push(`/admin/themes/${theme.id}`)
        else this.props.history.push(`/admin/subjects/${this.subjectId()}/themes?parent=${theme.id}`)
    }

    updateVisibility = theme => () => {
        this.updateTheme(theme.id, { isHidden: !theme.isHidden })
    }

    deleteTheme = theme => () => {
        const type = theme.type === 'Section' ? 'Раздел' : 'Тема'
        this.props.deleteTheme(theme.id).then(() => {
            this.props.enqueueSnackbar(`${type} '${theme.name}' удален(а)`)
        })
    }

    renderTheme = (theme, index) => {
        const visibilityComponent = !theme.isHidden ? <Icon /> : <VisibilityOff />
        const type = theme.type === 'Section' ? 'Раздел' : 'Тема'
        return (
            <ListItem key={theme.id} divider className="test-cases-for-filter">
                <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex' }}>
                        <ListItemContainer>
                            <Icon className={'sortable-handle'}>list</Icon>
                            <IconButton onClick={this.goToTheme(theme)}>
                                <Icon>folder_open</Icon>
                            </IconButton>
                            <Typography component={'span'}>{`${type}. ${theme.name}`}</Typography>
                        </ListItemContainer>
                        <IconButton onClick={this.updateVisibility(theme)}>{visibilityComponent}</IconButton>
                        <IconButton onClick={this.deleteTheme(theme)}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </div>
                </div>
            </ListItem>
        )
    }

    floatingButtonClicked = () => {
        this.modal.show()
    }

    onThemeSave = data => {
        const newData = { ...data }
        newData.parentTheme = this.parentId()
        this.props.createTheme(this.subjectId(), newData).then(() => {
            this.reloadList()
            this.modal.hide()
        })
    }

    renderNoThemes = () => {
        return (
            <NoThemesWrapper>
                <img style={{ height: 250, width: 190 }} src={'/frontend/images/no-themes.svg'} />
                <NoThemesText component={'span'}>
                    Следующим этапом после создания курса является наполнение курса... Начнем с формирования тем!
                </NoThemesText>
                <div style={{ height: 12 }} />
                <Button color="primary" variant={'contained'} onClick={this.floatingButtonClicked}>
                    Создать свой первый тему!
                </Button>
                <div style={{ height: 12 }} />
                <Button color="primary">Узнать подробнее</Button>
            </NoThemesWrapper>
        )
    }

    renderBody = () => {
        const { themes, themesFetching } = this.props
        if (this.noThemes()) return this.renderNoThemes()
        return (
            <List
                ref={ref => (this.list = ref)}
                subheader={
                    <ListHeader component="div" className="ignore-drag" disableSticky>
                        Темы
                    </ListHeader>
                }
                component="ul"
            >
                {themes.map(this.renderTheme)}
                {!themes.length && (
                    <Button color="primary" variant={'contained'} onClick={this.floatingButtonClicked}>
                        Создать тему
                    </Button>
                )}
            </List>
        )
    }

    render() {
        const { themes, themesFetching } = this.props
        if (!themes.length && themesFetching) {
            return (
                <div>
                    <LinearProgress />
                </div>
            )
        }
        return (
            <Card marginTop={12}>
                {this.renderBody()}
                <Fab style={styles.fabStyle} onClick={this.floatingButtonClicked}>
                    <Icon>add</Icon>
                </Fab>
                <Modal ref={ref => (this.modal = ref)}>
                    <ThemeCreation onThemeSave={this.onThemeSave} />
                </Modal>
            </Card>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    cardContainer: {
        padding: 8
    },
    boldText: {
        fontSize: 14
    },
    gridList: {
        overflowY: 'auto'
    },
    fabStyle: {
        position: 'fixed',
        right: 16,
        bottom: 16
    }
}

export default withProviders(ThemeProvider)(withSnackbar(ThemesScreen))
