import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { GridList, GridTile } from 'material-ui/GridList'
import { withGetScreen } from 'react-getscreen'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import { grey500, grey200, grey900 } from 'material-ui/styles/colors'
import HoverPaper from '../../components/common/HoverPaper'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Modal from 'reboron/ScaleModal'
import SubjectCreation from '../../components/subjects/SubjectCreation'
import { Subject } from '../../components/subjects/Subject'
import SubjectRepository, { SubjectProvider } from '../../mixins/admin/SubjectRepository'
import withProviders from '../../utils/withProviders'

class SubjectsScreen extends SubjectRepository(Component) {
    constructor(props) {
        super(props)
        this.state = {
            selectedSubject: undefined
        }
    }

    componentDidMount() {
        this.props.loadSubjects()
    }

    onClickSubject = id => {
        this.props.history.push(`/admin/subjects/${id}`)
    }

    onClickSubjectInfo = subject => {
        this.setState({ selectedSubject: subject })
        this.modalUpdate.show()
    }

    floatingButtonClicked = () => {
        this.modal.show()
    }

    onSubjectDelete = id => {
        this.props.deleteSubject(id).then(() => {
            this.props.loadSubjects()
            this.modalUpdate.hide()
        })
    }

    onSubjectUpdate = data => {
      const { selectedSubject } = this.state
        this.props.updateSubject(selectedSubject.id, data).then(() => {
            this.props.loadSubjects()
            this.modalUpdate.hide()
        })
    }

    onSubjectSave = data => {
        this.props.createSubject(data).then(() => {
            this.props.loadSubjects()
            this.modal.hide()
        })
    }

    render() {
        let numberOfColumns = 2
        console.log(this.state)
        if (this.props.subjects.length === 1 || this.props.isMobile()) numberOfColumns = 1
        return (
            <div style={styles.container}>
                <GridList padding={25} cellHeight={200} cols={numberOfColumns} style={styles.gridList}>
                    <Subheader>Предметы</Subheader>
                    {this.props.subjects.map(subject => (
                        <Subject
                            key={subject.subject}
                            subject={subject}
                            onClickSubject={this.onClickSubject}
                            onClickSubjectInfo={this.onClickSubjectInfo}
                        />
                    ))}
                </GridList>
                <FloatingActionButton
                    style={styles.fabStyle}
                    backgroundColor={grey900}
                    onClick={this.floatingButtonClicked}
                >
                    <ContentAdd />
                </FloatingActionButton>
                <Modal ref={ref => (this.modal = ref)}>
                    <SubjectCreation onSubjectSave={this.onSubjectSave} />
                </Modal>
                <Modal ref={ref => (this.modalUpdate = ref)}>
                    <SubjectCreation
                        initialState={this.state.selectedSubject}
                        onSubjectDelete={this.onSubjectDelete}
                        updateMode
                        onSubjectSave={this.onSubjectUpdate}
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
        // overflowY: 'auto'
    },
    modalStyle: {
        width: '80%'
    },
    fabStyle: {
        position: 'fixed',
        right: 16,
        bottom: 16
    }
}

export default withProviders(SubjectProvider)(withGetScreen(SubjectsScreen))
