import React from 'react'
import withProviders from '../../../utils/withProviders'
import SaveButton from '../../../components/common/SaveButton'
import { Card } from './index'
import EvysQuill from '../../../components/quill/EvysQuill'
import TestCaseRepository, {TestCaseProvider} from '../../../mixins/admin/TestCaseRepository'
import List from '@material-ui/core/List'
import {ListHeader, ListText} from './index'
import ListItem from '@material-ui/core/ListItem'
import Add from '@material-ui/icons/Add'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

class TestCases extends TestCaseRepository(React.Component){

  state = {
    testCases: null,
    selectedTestCase: null,
    selectedTest: null,
    loading: false,
    description: ''
  }

  componentDidMount(){
    this.loadTestCases()
  }

  selectTestCase = (testCaseId, testId) => () => {
    this.setState({selectedTestCase: testCaseId, selectedTest: testId })
  }

  renderVariants = (testCaseId) => (test, index) => {
    return(
      <Button key={test.id} variant='outlined' color='primary' onClick={this.selectTestCase(testCaseId, test.id)}>
        Вариант {index+1}
      </Button>
    )
  }

  descriptionChanged = (event) => {
    this.setState({description: event.target.value})
  }

  renderTestCase = (testCase, index) => {
    return (
      <ListItem key={testCase.id}>
        <div style={{flex: 1}}>
          <ListText primary={`${testCase.analogueId}. ${testCase.description}`}/>
          <div style={{paddingLeft: 20, paddingTop: 6}}>
            {testCase.tests.map(this.renderVariants(testCase.id))}
          </div>
        </div>
        <IconButton>
          <Add/>
        </IconButton>
        <IconButton>
          <Delete/>
        </IconButton>
      </ListItem>
    )
  }

  getCurrentAnalogueId = () => {
    const {testCases} = this.state
    if(!testCases.length) return 0
    return testCases[testCases.length - 1].analogueId + 1
  }

  submitNewTestCase = (e) => {
    e.preventDefault()
    this.createTestCase(this.getCurrentAnalogueId(), this.state.description)
        .then(() => this.setState({description: ''}))
  }

  renderCreationItem = () => {
    const {description} = this.state
    return(
      <ListItem>
        <div style={{paddingLeft: 20, flex: 1}}>
          <span>{this.getCurrentAnalogueId()}</span>
          <TextField
              onChange={this.descriptionChanged}
              label={'Название'}
              variant='outlined'
              value={description}
          />
        </div>
        <IconButton type='submit'>
          <Add/>
        </IconButton>
      </ListItem>
    )
  }

  render(){
    console.log(this.state)
    const {testCases} = this.state
    if (!testCases) return (
          <div>
              <LinearProgress />
          </div>
    )
    return(
      <Card marginTop={12}>
        <form onSubmit={this.submitNewTestCase}>
        <List subheader={<ListHeader disableSticky>Вопросы</ListHeader>} component="nav">
          {testCases.map(this.renderTestCase)}
          {this.renderCreationItem()}
        </List>
        </form>
      </Card>
    )
  }
}

export default withProviders(TestCaseProvider)(TestCases)
