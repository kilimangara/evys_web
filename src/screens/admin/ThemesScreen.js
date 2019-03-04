import React, { Component } from 'react'
import HoverPaper from '../../components/common/HoverPaper'
import GridList from '@material-ui/core/GridList'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import GridListTile from '@material-ui/core/GridListTile'
import Modal from 'reboron/ScaleModal'
import Fab from '@material-ui/core/Fab'
import Add from '@material-ui/icons/Add'
import ThemesRepository, { ThemeProvider } from '../../mixins/admin/ThemesRepository'
import withProviders from '../../utils/withProviders'
import ThemeCreation from '../../components/themes/ThemeCreation'
import LinearProgress from '@material-ui/core/LinearProgress'
import styled from 'styled-components'

const GridWrapper = styled.div`
    @media screen and (min-width: 0px) and (max-width: 1090px) {
        max-width: 474px;
    }
    @media screen and (min-width: 1090px) and (max-width: 1422px) {
        max-width: 898px;
    }
    @media screen and (min-width: 1422px) and (max-width: 1796px) {
        max-width: 1272px;
    }
    @media screen and (min-width: 1796px) {
        max-width: 1646px;
    }
    width: 5000px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
`

const Wrapper = styled(HoverPaper)`
    height: 300px;
    width: 400px;
    background: ${({ image }) => `url(${image}) no-repeat center center`};
    background-size: contain;
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
    }

    goToTheme = theme => () => {
        if (theme.type === 'Theme') this.props.history.push(`/admin/themes/${theme.id}`)
        else this.props.history.push(`/admin/subjects/${this.subjectId()}/themes?parent=${theme.id}`)
    }

    renderTheme = (theme, index) => {
        const hidden = !theme.isHidden ? 'Выставлен' : 'Скрыт'
        const type = theme.type === 'Section' ? 'Раздел' : 'Тема'
        return (
            <div style={{ margin: '18px 6px', backgroundColor: 'white' }} key={theme.id}>
                <GridListTile cols={1} component="div" onClick={this.goToTheme(theme)}>
                    <Wrapper image={'/images/EQ4.png'}>
                        <GridListTileBar
                            title={`${theme.num}. ${theme.name}`}
                            subtitle={
                                <b>
                                    {type} {hidden}
                                </b>
                            }
                        />
                    </Wrapper>
                </GridListTile>
            </div>
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
            <div style={styles.container}>
                <GridWrapper>{themes.map(this.renderTheme)}</GridWrapper>
                <Fab style={styles.fabStyle} onClick={this.floatingButtonClicked}>
                    <Add />
                </Fab>
                <Modal ref={ref => (this.modal = ref)}>
                    <ThemeCreation onThemeSave={this.onThemeSave} />
                </Modal>
            </div>
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
