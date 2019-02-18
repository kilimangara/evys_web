import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import 'react-quill/dist/quill.snow.css'
import Chip from 'material-ui/Chip'
import ReactQuill, { Toolbar } from 'react-quill'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import { blue500, grey200, grey500, green500, red500, grey900 } from 'material-ui/styles/colors'
import bind from 'memoize-bind'
import update from 'immutability-helper'
import Modal from 'reboron/ScaleModal'
import AnswerCreation from '../../components/test_cases/AnswerCreation'
import { GridList } from 'material-ui/GridList'
import Drawer from 'material-ui/Drawer'
import ImageAssetPicker from '../../components/template_assets/ImageAssetPicker'
import { connect } from 'react-redux'
import { pickAsset, switchManager } from '../../actions/admin/TemplateAssetsActions'

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'formula',
    'image'
]

class TestCaseCreation extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.initialState
    }

    saveToState = (field, event, value) => {
        this.setState({
            [field]: value
        })
    }

    saveTextToTask = (index, field, value) => {
        const newTest = { ...this.state.tests[index], [field]: value }
        const testList = update(this.state.tests, { $splice: [[index, 1, newTest]] })
        this.setState({
            tests: testList
        })
    }

    saveTextToTaskAlt = (index, field, event, value) => {
        const newTest = { ...this.state.tests[index], [field]: value }
        const testList = update(this.state.tests, { $splice: [[index, 1, newTest]] })
        this.setState({
            tests: testList
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.initialState)
    }

    modules = {
        toolbar: {
            container: [
                [{ header: '1' }, { header: '2' }, { font: [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                ['clean'],
                ['image'],
                ['formula']
            ],
            handlers: {}
        },
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false
        }
    }

    initQuill = index => {
        const quill = this[`quill${index}`].getEditor()
        const toolbar = quill.getModule('toolbar')
        toolbar.addHandler('image', value => {
            this.focusedQuillIndex = index
            this.focusedQuill = quill
            this.props.switchManager()
        })
    }

    renderTest = (testItem, index) => {
        return (
            <Paper key={index} style={{ padding: '20px', margin: '0 20px', minWidth: 250 }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch'
                    }}
                >
                    <TextField
                        onChange={bind(this.saveTextToTaskAlt, this, index, 'name')}
                        floatingLabelText="Название"
                        value={testItem.name}
                        underlineFocusStyle={{ borderColor: grey900 }}
                        multiLine
                        fullWidth
                    />
                    <ReactQuill
                        ref={ref => (this[`quill${index}`] = ref)}
                        value={testItem.task}
                        onChange={bind(this.saveTextToTask, this, index, 'task')}
                        theme={'snow'}
                        modules={this.modules}
                        formats={formats}
                    />
                    <h4>Ответы</h4>
                    <Divider />
                    {testItem.answers.map(bind(this.renderAnswers, this, index))}
                    <Chip
                        style={styles.chip}
                        onClick={() => {
                            this.currentTestIndex = index
                            this.modal.show()
                        }}
                    >
                        Добавить ответ
                    </Chip>
                    <Divider />
                    <RaisedButton
                        label="Удалить"
                        style={{ marginTop: 12 }}
                        labelStyle={{ color: 'white' }}
                        backgroundColor={grey900}
                        onClick={bind(this.deleteTest, this, index)}
                    />
                </div>
            </Paper>
        )
    }

    renderAnswers = (test_index, answer, index) => {
        const backgroundColor = answer.is_right ? green500 : red500
        return (
            <Chip
                key={index}
                style={styles.chip}
                backgroundColor={backgroundColor}
                onRequestDelete={this.deleteAnswer.bind(this, test_index, index)}
                onClick={this.answerClicked.bind(this, test_index, index)}
            >
                {answer.content}
            </Chip>
        )
    }

    deleteAnswer = (test_index, answer_index) => {
        const test = this.state.tests[test_index]
        if (!test) return
        const answer = test.answers[answer_index]
        if (answer.id != undefined) this.props.onDeleteAnswer(test.id, answer.id)
        else {
            const newTest = { ...test, answers: update(test.answers, { $splice: [[answer_index, 1]] }) }
            this.setState({ tests: update(this.state.tests, { $splice: [[test_index, 1, newTest]] }) })
        }
    }

    deleteTest = test_index => {
        const test = this.state.tests[test_index]
        if (test.id != undefined) this.props.onDeleteTest(this.state.id, test.id)
        else {
            this.setState({ tests: update(this.state.tests, { $splice: [[test_index, 1]] }) })
        }
    }

    answerClicked = (test_index, answer_index) => {
        const test = this.state.tests[test_index]
        if (!test) return
        const answer = test.answers[answer_index]
    }

    addTest = () => {
        const newTest = {
            name: '',
            task: '',
            tip: '<p>Пусто</p>',
            answers: []
        }
        this.setState({ tests: update(this.state.tests, { $push: [newTest] }) })
    }

    addAnswer = answerObject => {
        if (this.currentTestIndex != undefined) {
            const test = this.state.tests[this.currentTestIndex] || { answers: [] }
            const newTest = { ...test, answers: update(test.answers, { $push: [answerObject] }) }
            this.setState({ tests: update(this.state.tests, { $splice: [[this.currentTestIndex, 1, newTest]] }) })
        }
        this.currentTestIndex = undefined
        this.modal.hide()
    }

    componentDidMount() {
        const { tests } = this.state
        tests.forEach((t, index) => this.initQuill(index))
    }

    componentDidUpdate(prevProps) {
        const { tests } = this.state
        tests.forEach((t, index) => this.initQuill(index))
        const { asset } = this.props
        if (asset && this.focusedQuillIndex != null) {
            const range = this.focusedQuill.getSelection()
            this.focusedQuill.insertEmbed(range.index, 'image', asset.file, 'user')
            // const testText = this.focusedQuill.getText(0)
            // this.saveTextToTask(this.focusedQuillIndex, 'task', testText)
            this.props.pickAsset(null, null)
        }
    }

    syncQuillWithState = () => {}

    render() {
        const { analogue_id, description, tests } = this.state
        let numberOfColumns = tests.length > 1 ? 2 : 1
        if (this.props.isMobile) numberOfColumns = 1
        return (
            <div style={styles.container}>
                <TextField
                    onChange={this.saveToState.bind(this, 'analogue_id')}
                    floatingLabelText="Идентификатор"
                    value={analogue_id}
                    type={'number'}
                    underlineFocusStyle={{ borderColor: grey900 }}
                />
                <TextField
                    onChange={this.saveToState.bind(this, 'description')}
                    floatingLabelText="Описание"
                    value={description}
                    underlineFocusStyle={{ borderColor: grey900 }}
                />
                <div style={styles.editorContainer}>
                    <h2 style={{ textAlign: 'center' }}>Вопросы</h2>
                    <Divider />
                    <GridList padding={25} cellHeight={'auto'} cols={numberOfColumns} style={{ overflowY: 'auto' }}>
                        {tests.map(this.renderTest)}
                    </GridList>
                    <Paper style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <RaisedButton
                            label="Добавить вопрос"
                            labelStyle={{ color: 'white' }}
                            backgroundColor={grey900}
                            onClick={bind(this.addTest, this)}
                        />
                    </Paper>
                </div>
                <Modal ref={ref => (this.modal = ref)}>
                    <AnswerCreation onAnswerSaved={this.addAnswer} />
                </Modal>
                <RaisedButton
                    label="Сохранить"
                    style={{ marginTop: 20 }}
                    labelStyle={{ color: 'white' }}
                    backgroundColor={grey900}
                    onClick={this.props.onTestCaseSave.bind(this, this.state)}
                />
                <RaisedButton
                    label="Удалить"
                    style={{ marginTop: 20 }}
                    labelStyle={{ color: 'white' }}
                    backgroundColor={grey900}
                    onClick={this.props.onTestCaseDelete.bind(this, this.state.id)}
                />
            </div>
        )
    }
}

TestCaseCreation.defaultProps = {
    onTestCaseSave: data => {},
    onTestCaseDelete: id => {},
    onDeleteAnswer: data => {},
    onDeleteTest: data => {},
    initialState: {
        id: undefined,
        analogue_id: undefined,
        description: '',
        tests: [],
        tree_connections: []
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 36
    },
    editorContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch',
        display: 'flex',
        padding: 4,
        margin: 8,
        borderColor: grey500,
        borderWidth: '2px',
        borderRadius: '25px'
    },
    chip: {
        margin: 4
    }
}

const mapStateToProps = state => ({
    asset: state.asset_manager.asset,
    meta: state.asset_manager.meta
})

export default connect(
    mapStateToProps,
    { pickAsset, switchManager }
)(TestCaseCreation)
