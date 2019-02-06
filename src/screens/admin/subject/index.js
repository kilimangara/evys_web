import React from 'react'
import SubjectRepository, { SubjectProvider } from '../../../mixins/admin/SubjectRepository'
import withProviders from '../../../utils/withProviders'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import { theme } from '../../../utils/global_theme'
import produce from "immer"
import LinearProgress from '@material-ui/core/LinearProgress'
import SaveButton from '../../../components/common/SaveButton'
import { Route } from 'react-router'
import MainInfo from './main-info'
import Chip from '@material-ui/core/Chip'

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
  margin-top: ${({ marginTop=0 }) => `${marginTop}px`};
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: white;
  box-shadow: 0 0 1px #bdbfc1, 0 1px #ced2d3;
  padding: 12px;
`

const ColoredButton = styled(Button)`
  background-color: ${theme.ACCENT_COLOR};
  color: white;
`

export const TagChip = styled(Chip)`
  margin: 8px;
  background-color: ${theme.ACCENT_COLOR};
  color: white;
  border: 1px solid ${theme.ACCENT_COLOR};
`

class SubjectScreen extends SubjectRepository(React.Component) {

  state = {
    tag: ''
  }

  componentDidMount(){
    this.getSubject()
    this.syncCategories()
  }

  componentDidUpdate(prevProps){
    if(this.props.subject !== prevProps.subject) this.setState({subject: this.props.subject})
  }

  subjectUpdated = (subject) => {
    this.setState({subject})
  }

  saveSubject = () => {
    return this.updateSubject()
  }

  renderMainInfo = () => {
    return <MainInfo subject={this.state.subject}
                     subjectUpdated={this.subjectUpdated}
                     saveSubject={this.saveSubject}
                     fetching={this.props.subjectsFetching}
                     categories={this.state.categories}/>
  }

  render(){
    const { subject, categories } = this.state
    console.log(this.state)
    if(!subject || !categories)
      return(
        <div>
          <LinearProgress/>
        </div>
      )
    return(
      <Container>
        <Card>
          <List subheader={<ListHeader disableSticky>Настройки курса</ListHeader>} component='nav'>
            <ListItem button>
              <ListText primary="Основные настройки" />
            </ListItem>
            <ListItem button>
              <ListText primary="Содержание курса" />
            </ListItem>
            <ListItem button>
              <ListText primary="Информация для ученика" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ColoredButton type='contained'>
                {this.isHidden() ? 'Опубликовать курс' : 'Скрыть курс'}
              </ColoredButton>
            </ListItem>
          </List>
        </Card>
        <Route exact path='/admin/subjects/:subjectId(\d+)' render={this.renderMainInfo}/>
      </Container>
    )
  }
}


export default withProviders(SubjectProvider)(SubjectScreen)
