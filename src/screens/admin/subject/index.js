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

const Card = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: white;
  box-shadow: 0 0 1px #bdbfc1, 0 1px #ced2d3;
`

class SubjectScreen extends SubjectRepository(React.Component) {

  componentDidMount(){
    this.getSubject()
  }


  render(){
    return(
      <Container>
        <Card>
        <List subheader={<ListHeader>Настройки курса</ListHeader>} component='nav'>
          <ListItem button>
            <ListText primary="Основные настройки" />
          </ListItem>
          <ListItem button>
            <ListText primary="Содержание курса" />
          </ListItem>
          <ListItem button>
            <ListText primary="Цена и скидки" />
          </ListItem>
          <Divider/>
          <ListItem>
            <Button variant="contained" color="primary">
               Опубликовать курс
            </Button>
          </ListItem>
        </List>
        </Card>
      </Container>
    )
  }
}


export default withProviders(SubjectProvider)(SubjectScreen)
