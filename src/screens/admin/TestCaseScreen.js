import React, {Component} from 'react'
import ReactDOM from "react-dom"
import {connect } from 'react-redux'
import RaisedButton from "material-ui/RaisedButton"
import {withGetScreen} from 'react-getscreen'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import {getTestCases, updateTestCase,
        createTestCase, deleteAnswer, deleteTest,
        deleteTestCase} from '../../actions/admin/TestCaseActions'
import Graph from 'react-graph-vis'
import {blue500, grey200, grey500, green500, red500, grey900} from 'material-ui/styles/colors'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import {GRAPH_OPTIONS} from '../../components/test_cases/TestCaseGraph'
import 'vis/dist/vis.css'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import update from 'immutability-helper'
import TestCaseCreation from '../../components/test_cases/TestCaseCreation'
import bind from 'memoize-bind'
import {Tabs, Tab} from 'material-ui/Tabs'
import TheoryView from '../../components/theory/TheoryView'

class TestCaseScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      testCaseSelected: undefined,
      testCases: this.props.testCaseList,
      tabSelected: 'tests'
    }
    this.id = this.props.match.params["theme_id"]
  }

  handleTabChange = (value) => {
    this.setState({tabSelected: value})
  }

  componentDidMount(){
    this.props.getTestCases(this.id)
    this.graphBounds = ReactDOM.findDOMNode(this.graph).getBoundingClientRect()
  }

  componentWillReceiveProps(nextProps){
    this.setState({testCases: nextProps.testCaseList})
  }

  changeEditorState = (text) => {
    this.setState({text})
  }

  generateDataForGraph = () => {
    const graph = {
      nodes: [],
      edges: []
    }
    this.state.testCases.forEach(tc => {
      const tcObj = {
        id: tc.id || tc.hash,
        label: `${tc.analogue_id}`
      }
      graph.nodes.push(tcObj)
      tc.tree_connections.forEach(conn => {
        const connectionObj = {
          id: conn.id,
          from: tc.id,
          to: conn.test_case_out,
          label: conn.content,
          arrow: 'to'
        }
        graph.edges.push(connectionObj)
      })
    })
    return graph
  }

  createTestCase = () => {
    const lastTestCase = this.state.testCases[this.state.testCases.length - 1] || {analogue_id:undefined}
    const newTestCase = {
      analogue_id : lastTestCase.analogue_id != undefined ? lastTestCase.analogue_id +1 : 0,
      description: 'Небольшое описание для создателя курса',
      tests: [
        {
          name:'Название вопроса',
          task: '<p>Выберите правильный ответ</p>',
          tip: "<p>Пусто</p>",
          answers: [
              {
                  "content": "Неправильный ответ!",
                  "is_right": false
              },
              {
                  "content": "Правильный ответ!",
                  "is_right": true
              }
          ]
        }
      ],
      tree_connections: [],
    }
    const id = this.props.match.params["theme_id"];
    this.props.createTestCase(id, newTestCase)
              .then(() => this.props.getTestCases(id))
              .then((res) => {
                this.setState({testCases: res.data.data})
              })
  }

  createVideo = () => {
    console.log('createVideo')
  }

  floatingButtonClicked = () => {
    if(this.state.tabSelected === 'tests') this.createTestCase()
    if(this.state.tabSelected === 'theory') this.createVideo()
  }

  renderTestCase(){
    if(!this.state.testCaseSelected) return null
    return <TestCaseCreation
               isMobile={this.props.isMobile()}
               onDeleteAnswer={this.handleAnswerDeleted}
               onDeleteTest={this.handleTestDeleted}
               onTestCaseSave={this.handleSaveTestCase}
               initialState={this.state.testCaseSelected}
               onTestCaseDelete={this.handleDeleteTestCase}/>
  }

  handleTestDeleted = (test_case_id, test_id) => {
    this.props.deleteTest(test_case_id, test_id)
              .then((res) => {
                this.setState({testCaseSelected: res.data.data})
                return this.props.getTestCases(id)
              })
              .then((res) => {
                this.setState({testCases: res.data.data})
              })
  }

  handleAnswerDeleted = (test_id, answer_id) => {
    this.props.deleteAnswer(test_id, answer_id)
              .then((res) => {
                this.setState({testCaseSelected: res.data.data})
                return this.props.getTestCases(id)
              })
              .then((res) => {
                this.setState({testCases: res.data.data})
              })
  }

  handleSaveTestCase = (data) => {
    const id = this.props.match.params["theme_id"]
    this.props.updateTestCase(id, data.id, data)
              .then((res) => {
                this.setState({testCaseSelected: res.data.data})
                return this.props.getTestCases(id)
              })
              .then((res) => {
                this.setState({testCases: res.data.data})
              })
  }

  handleDeleteTestCase = (test_case_id) => {
    const id = this.props.match.params["theme_id"]
    this.props.deleteTestCase(id, test_case_id)
              .then(() => this.props.getTestCases(id))
              .then((res) => {
                this.setState({testCases: res.data.data, testCaseSelected: undefined})
              })
  }

  handleAddConnection(connectionData, callback) {
    console.log(connectionData)
  }

  handleDeleteConnection(connectionData, callback) {
    console.log(connectionData)
  }

  scrollToTestCase = () => {
    const {bottom} = this.graphBounds
    window.scroll({top: bottom, behavior: 'smooth'})
  }

  render(){
    const graph = this.generateDataForGraph()
    const events = {
      click: (event) => {
        const { nodes, edges } = event;
        const testCaseSelected = this.props.testCaseList.find(tc => tc.id == nodes[0])
        this.setState({testCaseSelected}, this.scrollToTestCase)
      }
    };
    const {testCaseSelected} = this.state
    const options = {
      autoResize: true,
      height: this.props.isMobile() ? '210px' : '420px',
      width: '100%',
      locale: 'ru',
      ...GRAPH_OPTIONS,
      manipulation: {
        enabled: true,
        addNode: false,
        editEdge: true,
        deleteNode: false,
        addEdge: bind(this.handleAddConnection, this),
        deleteEdge: bind(this.handleDeleteConnection, this),
        editEdge: false
      }
    }
    return(
      <div>
        <Tabs inkBarStyle={{backgroundColor:'white'}} value={this.state.tabSelected} onChange={this.handleTabChange}>
          <Tab label='Задания' style={{backgroundColor: '#1EAAF0'}} value='tests'>
            <div style={styles.container}>
              <div style={{display:'flex', justifyContent: 'center', flexDirection:'column'}}>
                <Graph events={events} options={options} graph={graph} ref={(ref) => this.graph = ref}/>
                <Divider/>
                {this.renderTestCase()}
              </div>
            </div>
          </Tab>
          <Tab label='Теория' style={{backgroundColor: '#1EAAF0'}} value='theory'>
            <TheoryView themeId={this.id}/>
          </Tab>
        </Tabs>
        <FloatingActionButton style={styles.fabStyle}
            backgroundColor={grey900}
            onClick={this.floatingButtonClicked}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 16
  },
  editorContainer: {
    flexDirection:'column',
    display:'flex',
    padding: 4,
    backgroundColor: grey200,
    borderColor: grey500,
    borderWidth: '2px',
    borderRadius: '25px'
  },
  cardContainer: {
    padding: 8,
  },
  chip: {
    margin: 4,
  },
  boldText: {
    fontSize: 14
  },
  graphContainer: {
    borderColor: grey200,
    borderWidth: '1px'
  },
  fabStyle: {
    position: 'fixed',
    right: 16,
    bottom: 16
  }
}

const mapStateToProps = (state, props) => ({
  testCaseList: state.test_cases_admin.testCaseList || []
})

const mapDispatchToProps = {
  getTestCases,
  createTestCase,
  updateTestCase,
  deleteAnswer,
  deleteTest,
  deleteTestCase
}

export default connect(mapStateToProps, mapDispatchToProps)(withGetScreen(TestCaseScreen))
