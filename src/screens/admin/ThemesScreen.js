import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GridList, GridTile } from 'material-ui/GridList'
import { withGetScreen } from 'react-getscreen'
import { loadThemesBySubject, createThemeBySubject, deleteTheme, updateTheme } from '../../actions/admin/ThemesActions'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import { grey500, grey200, grey900 } from 'material-ui/styles/colors'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Modal from 'reboron/ScaleModal'
import ThemeCreation from '../../components/themes/ThemeCreation'
import HoverPaper from '../../components/common/HoverPaper'
import bind from 'memoize-bind'
import styled from 'styled-components'

const GridWrapper = styled.div`
    @media screen and (min-width: 0px) and (max-width: 1090px) {
        max-width: 374px;
    }
    @media screen and (min-width: 1090px) and (max-width: 1422px) {
        max-width: 748px;
    }
    @media screen and (min-width: 1422px) and (max-width: 1796px) {
        max-width: 1122px;
    }
    @media screen and (min-width: 1796px) {
        max-width: 1496px;
    }
    width: 5000px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
`

class ThemesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            themeSelected: undefined
        }
    }

    componentWillMount() {
        const id = this.props.match.params['id']
        this.props.loadThemesBySubject(id)
    }

    onThemeClick = id => {
        this.props.history.push(`/admin/themes/${id}`)
    }

    onThemeClickInfo = theme => {
        this.setState({ themeSelected: theme })
        this.modalUpdate.show()
    }

    renderTheme = (theme, index) => {
        const hidden = !theme.is_hidden ? 'Выставлен' : 'Скрыт'
        return (
            <div key={theme.id} onClick={bind(this.onThemeClickInfo, this, theme)}>
                <HoverPaper style={{ height: 200 }}>
                    <GridTile
                        title={`${theme.num}. ${theme.name}`}
                        subtitle={<b>{hidden}</b>}
                        actionIcon={
                            <IconButton
                                onClick={this.onThemeClick.bind(this, theme.id)}
                                iconStyle={{ color: grey200 }}
                                iconClassName="far fa-play-circle"
                                tooltip={'Вопросы'}
                                tooltipPosition={'top-center'}
                            />
                        }
                    >
                        <img src="/static/images/EQ4.png" />
                    </GridTile>
                </HoverPaper>
            </div>
        )
    }

    floatingButtonClicked = () => {
        this.modal.show()
    }

    onThemeSave = data => {
        const id = this.props.match.params['id']
        this.props.createThemeBySubject(id, data).then(() => {
            this.props.loadThemesBySubject(id)
            this.modal.hide()
        })
    }

    onThemeDelete = id => {
        const subject_id = this.props.match.params['id']
        this.props.deleteTheme(id).then(() => {
            this.props.loadThemesBySubject(subject_id)
            this.modalUpdate.hide()
        })
    }

    onThemeUpdate = data => {
        const subject_id = this.props.match.params['id']
        this.props.updateTheme(data.id, data).then(() => {
            this.props.loadThemesBySubject(subject_id)
            this.modalUpdate.hide()
        })
    }

    render() {
        let numberOfColumns = 2
        if (this.props.themesList.length === 1 || this.props.isMobile()) numberOfColumns = 1
        return (
            <div style={styles.container}>
                <GridList padding={25} cellHeight={200} cols={numberOfColumns} style={styles.gridList}>
                    <Subheader>Темы</Subheader>
                    {this.props.themesList.map(this.renderTheme)}
                </GridList>
                <FloatingActionButton
                    style={styles.fabStyle}
                    backgroundColor={grey900}
                    onClick={this.floatingButtonClicked}
                >
                    <ContentAdd />
                </FloatingActionButton>
                <Modal ref={ref => (this.modal = ref)}>
                    <ThemeCreation onThemeSave={this.onThemeSave} />
                </Modal>
                <Modal ref={ref => (this.modalUpdate = ref)}>
                    <ThemeCreation
                        onThemeDelete={this.onThemeDelete}
                        updateMode
                        initialState={this.state.themeSelected}
                        onThemeSave={this.onThemeUpdate}
                    />
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

const mapStateToProps = (state, props) => ({
    themesList: state.themes_admin.themesTree[null] || []
})

export default connect(
    mapStateToProps,
    { loadThemesBySubject, createThemeBySubject, deleteTheme, updateTheme }
)(withGetScreen(ThemesScreen))
