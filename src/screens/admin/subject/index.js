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
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import produce from "immer"
import LinearProgress from '@material-ui/core/LinearProgress'
import SaveButton from '../../../components/common/SaveButton'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Add from '@material-ui/icons/Add'
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

const Card = styled.div`
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

const TagChip = styled(Chip)`
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

  fieldChanged = (field) => (event) => {
    let value = event.target.value
    if(field === 'categorySecret') {
      const category = this.state.categories.find(category => category.categorySecret === event.target.value)
      value = category.categorySecret
    }
    this.setState(produce(this.state, (draft) => {draft.subject[field] = value}))
  }

  saveSubject = () => {
    this.updateSubject().then(() => this.saveButton.success())
  }

  handleAddTag = (e) => {
    console.log(e)
    e.preventDefault()
    const { tag } = this.state
    if (!tag) return
    this.setState(produce(this.state, (draft) => {
      draft.tag = ''
      draft.subject.tags.push(tag)
    }))
  }

  deleteTag = (index) => () => {
    this.setState(produce(this.state, (draft) => {
      draft.subject.tags.splice(index, 1)
    }))
  }

  render(){
    const { subject, categories } = this.state
    console.log(this.props)
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
              <ListText primary="Цена и скидки" />
            </ListItem>
            <Divider/>
            <ListItem>
              <ColoredButton type='contained'>
                Опубликовать курс
              </ColoredButton>
            </ListItem>
          </List>
        </Card>

        <Card marginTop={12}>
        <TextField
            onChange={this.fieldChanged('subject')}
            label={'Название'}
            variant='outlined'
            value={subject.subject}
            fullWidth
            margin={'normal'}
        />
        <TextField
            select
            variant='outlined'
            margin="normal"
            label={'Категория'}
            fullWidth
            value={subject.categorySecret || subject.category.categorySecret}
            onChange={this.fieldChanged('categorySecret')}
        >
            {(categories.length &&
                categories.map(category => (
                    <MenuItem key={category.categorySecret} value={category.categorySecret}>
                        {category.verboseName}
                    </MenuItem>
                ))) ||
                []}
        </TextField>
        <form onSubmit={this.handleAddTag} style={{position: 'relative'}}>
          <TextField
            onChange={(event) => this.setState({tag: event.target.value})}
            label={'Тэг'}
            variant='outlined'
            fullWidth
            value={this.state.tag}
            margin={'normal'}
          />
          <div style={{position: 'absolute', right: 12, top: 20}}>
            <IconButton type='submit' onClick={this.handleAddTag}>
              <Add/>
            </IconButton>
          </div>
        </form>
        <div style={{display: 'flex', justifyContent: 'flex-start',flexWrap: 'wrap'}}>
         {subject.tags && subject.tags.map((t, index) => <TagChip variant='outlined' label={`#${t}`} onDelete={this.deleteTag(index)}/>)}
        </div>
        <div>
         <SaveButton ref={(ref) => this.saveButton = ref} loading={this.props.subjectsFetching} onClick={this.saveSubject}/>
        </div>
        </Card>
      </Container>
    )
  }
}


export default withProviders(SubjectProvider)(SubjectScreen)
