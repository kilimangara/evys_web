import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'reboron/ScaleModal'
import Fab from '@material-ui/core/Fab'
import Add from '@material-ui/icons/Add'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import ThemesRepository, { ThemeProvider } from '../../../mixins/admin/ThemesRepository'
import withProviders from '../../../utils/withProviders'
import ThemeCreation from '../../../components/themes/ThemeCreation'
import LinearProgress from '@material-ui/core/LinearProgress'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import { ListHeader, ListText, Card } from './index'
import ListItem from '@material-ui/core/ListItem'
import ListIcon from '@material-ui/icons/List'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Delete from '@material-ui/icons/Delete'
import Sortable from 'sortablejs'
import FolderOpen from '@material-ui/icons/FolderOpen'

const ListItemContainer = styled.div`
    padding-left: 8px;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
            console.log('sortable')
            const listElement = ReactDOM.findDOMNode(this.list)
            const sortable = new Sortable(listElement, {
                handle: '.sortable-handle',
                filter: '.ignore-drag',
                onEnd: this.updateVariantPositions
            })
        }
    }

    updateVariantPositions = event => {
        const { oldIndex, newIndex } = event
        console.log(oldIndex, newIndex)
    }

    goToTheme = theme => () => {
        if (theme.type === 'Theme') this.props.history.push(`/admin/themes/${theme.id}`)
        else this.props.history.push(`/admin/subjects/${this.subjectId()}/themes?parent=${theme.id}`)
    }

    renderTheme = (theme, index) => {
        const visibilityComponent = !theme.isHidden ? <Visibility /> : <VisibilityOff />
        const type = theme.type === 'Section' ? 'Раздел' : 'Тема'
        return (
            <ListItem key={theme.id} divider className="test-cases-for-filter">
                <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex' }}>
                        <ListItemContainer>
                            <ListIcon className={'sortable-handle'} />
                            <IconButton onClick={this.goToTheme(theme)}>
                                <FolderOpen />
                            </IconButton>
                            <Typography component={'span'}>{`${type}. ${theme.name}`}</Typography>
                        </ListItemContainer>
                        <IconButton>{visibilityComponent}</IconButton>
                        <IconButton>
                            <Delete />
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
                </List>
                <Fab style={styles.fabStyle} onClick={this.floatingButtonClicked}>
                    <Add />
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

export default withProviders(ThemeProvider)(ThemesScreen)
