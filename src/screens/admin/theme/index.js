import React from 'react'
import ThemesRepository, { ThemeProvider } from '../../../mixins/admin/ThemesRepository'
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


const Container = styled.div`
    display: flex;
    padding: 24px 12px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
`

const ListHeader = styled(ListSubheader)`
    font-weight: 600;
    font-size: 18px;
    color: black;
`

const ListText = styled(ListItemText)`
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

class ThemeScreen extends ThemesRepository(React.Component) {
  state = {
      errors: {}
  }

  componentDidMount() {
      this.getTheme()
  }

  componentDidUpdate(prevProps) {
      if (this.props.theme !== prevProps.theme) this.setState({ theme: this.props.theme })
  }

  themeUpdated = theme => {
      this.setState({ theme })
  }

  saveTheme = () => {
      return this.updateTheme().then(() => this.setState({errors: {}})).catch(err => {
          const { response } = err
          if (response.status === 400) this.setState({ errors: response.data })
          throw err
      })
  }

  isHidden = () => this.state.theme.isHidden

  changeVisibility = () => {
    const {theme} = this.state
    this.state = produce(this.state, (draft) =>{
      draft.theme.isHidden = !draft.theme.isHidden
    })
    this.saveTheme()
  }

  render(){
    const { theme } = this.state
    if (!theme)
        return (
            <div>
                <LinearProgress />
            </div>
        )
    return(
      <Container>
          <Card>
              <List subheader={<ListHeader disableSticky>Настройки темы</ListHeader>} component="nav">
                  <ListItem button>
                      <ListText primary="Основные настройки" />
                  </ListItem>
                  <ListItem button>
                      <ListText primary="Теория"/>
                  </ListItem>
                  <ListItem button>
                      <ListText primary="Вопросы" />
                  </ListItem>
                  <Divider />
                  <div style={{marginLeft: 16, marginTop: 8}}>
                    <ColoredButton type="contained" margin='normal' onClick={this.changeVisibility}>
                        {this.isHidden() ? 'Опубликовать тему' : 'Скрыть курс'}
                    </ColoredButton>
                  </div>
              </List>
          </Card>
      </Container>
    )
  }
}

export default withProviders(ThemeProvider)(ThemeScreen)
