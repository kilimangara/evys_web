import React, { Component } from 'react'
import { grey900 } from 'material-ui/styles/colors'
import AutoComplete from 'material-ui/AutoComplete'
import update from 'immutability-helper'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever'
import bind from 'memoize-bind'
import { connect } from 'react-redux'
import { loadSubjects, getSubject } from '../../actions/admin/SubjectActions'
import TextField from 'material-ui/TextField'

class SubjectPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subjects: this.props.subjects,
            subjectsPresentation: [],
            dataSource: []
        }
    }

    componentWillMount() {
        this.state.subjects.forEach(el => {
            if (el != undefined) {
                this.props.getSubject(el).then(res => {
                    const subjectsPresentation = update(this.state.subjectsPresentation, { $push: [res.data.data] })
                    this.setState({ subjectsPresentation })
                })
            }
        })
    }

    loadSubjects = query => {
        this.setState({ searchText: query })
        this.props.loadSubjects(1, query).then(res => {
            this.setState({ dataSource: res.data.data.results })
        })
    }

    handleSelection = (chosenRequest, index) => {
        if (index === -1) return
        const selectedSubject = this.state.dataSource[index]
        const subjects = update(this.state.subjects, { $push: [selectedSubject.id] })
        const subjectsPresentation = update(this.state.subjectsPresentation, { $push: [selectedSubject] })
        this.setState({ subjectsPresentation, subjects })
        this.props.onSubjectsChanged(subjects)
    }

    deleteSubject = index => {
        const subjects = update(this.state.subjects, { $splice: [[index, 1]] })
        this.setState({ subjects })
        this.props.onSubjectsChanged(subjects)
    }

    renderAutoComplete = (subjectId, index) => {
        const subject = this.state.subjectsPresentation.find(el => el.id == subjectId) || {}
        return (
            <div style={{ display: 'inline-block' }} key={index}>
                <TextField value={subject.subject} />
                <IconButton onClick={bind(this.deleteSubject, this, index)} style={{ marginLeft: 12 }}>
                    <DeleteIcon />
                </IconButton>
            </div>
        )
    }

    render() {
        return (
            <div style={styles.container}>
                {this.state.subjects.map(this.renderAutoComplete)}
                <div style={{ display: 'inline-block' }}>
                    <AutoComplete
                        hintText={'Введите название предмета'}
                        onUpdateInput={this.loadSubjects}
                        onNewRequest={bind(this.handleSelection, this)}
                        dataSource={this.state.dataSource.map(el => el.subject)}
                    />
                </div>
            </div>
        )
    }
}

SubjectPicker.defaultProps = {
    subjects: [],
    onSubjectsChanged: subjects => {}
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
}

export default connect(
    null,
    { loadSubjects, getSubject }
)(SubjectPicker)
