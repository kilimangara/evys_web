import React, { Component } from 'react'
import HoverPaper from '../../components/common/HoverPaper'
import GridList from '@material-ui/core/GridList'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import GridListTile from '@material-ui/core/GridListTile'
import IconButton from 'material-ui/IconButton'
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

const Wrapper = styled(HoverPaper)`
  height: 300px;
  width: 450px;
  background: ${({image}) => `url(${image}) no-repeat center center`};
  background-size: contain;
`

class ThemesScreen extends ThemesRepository(Component) {

    state = {
      page: 1
    }

    componentDidMount() {
      this.props.loadThemes(this.subjectId())
    }

    goToTheme = (theme) => () => this.props.history.push(`/admin/themes/${theme.id}`)

    renderTheme = (theme, index) => {
        const hidden = !theme.isHidden ? 'Выставлен' : 'Скрыт'
        return (
          <div style={{margin: '18px 6px', backgroundColor: 'white'}} key={theme.id}>
          <GridListTile cols={1} component='div' onClick={this.goToTheme(theme)}>
              <Wrapper image={'/images/EQ4.png'}>
                  <GridListTileBar
                      title={`${theme.num}. ${theme.name}`}
                      subtitle={<b>{hidden}</b>}
                  >
                  </GridListTileBar>
              </Wrapper>
          </GridListTile>
          </div>
        )
    }

    floatingButtonClicked = () => {
        this.modal.show()
    }

    onThemeSave = data => {
      this.props.createTheme(this.subjectId(), data).then(() => {
          this.props.loadThemes(this.subjectId())
          this.modal.hide()
      })
    }

    render() {
        const {themes} = this.props
        if(!themes.length){
          return(
            <div>
              <LinearProgress/>
            </div>
          )
        }
        return (
            <div style={styles.container}>
              <GridWrapper>
                  {themes.map(this.renderTheme)}
              </GridWrapper>
                <Fab
                    style={styles.fabStyle}
                    onClick={this.floatingButtonClicked}
                >
                  <Add />
                </Fab>
              <Modal ref={ref => this.modal = ref}>
                <ThemeCreation onThemeSave={this.onThemeSave}/>
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
