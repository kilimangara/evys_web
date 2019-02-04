import React, { Component } from 'react'
import { connect } from 'react-redux'
import GridList from '@material-ui/core/GridList'
import { withGetScreen } from 'react-getscreen'
import ListSubheader from '@material-ui/core/ListSubheader'
import HoverPaper from '../../components/common/HoverPaper'
import Fab from '@material-ui/core/Fab'
import Add from '@material-ui/icons/Add'
import Modal from 'reboron/ScaleModal'
import SubjectCreation from '../../components/subjects/SubjectCreation'
import { Subject } from '../../components/subjects/Subject'
import SubjectRepository, { SubjectProvider } from '../../mixins/admin/SubjectRepository'
import withProviders from '../../utils/withProviders'
import styled from 'styled-components'

const GridWrapper = styled.div`
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
`

class SubjectsScreen extends SubjectRepository(Component) {
    componentDidMount() {
        this.props.loadSubjects()
    }

    onClickSubject = id => {
        this.props.history.push(`/admin/subjects/${id}`)
    }

    onClickSubjectInfo = subject => {
        this.props.history.push(`/admin/subjects/${subject.id}`)
    }

    floatingButtonClicked = () => {
        this.modal.show()
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
                <GridWrapper>
                    {this.props.subjects.map(subject => (
                      <div style={{margin: '36px 12px'}}>
                        <Subject
                            key={subject.subject}
                            subject={subject}
                            onClickSubject={this.onClickSubject}
                            onClickSubjectInfo={this.onClickSubjectInfo}
                        />
                      </div>
                    ))}
                </GridWrapper>
                <Fab
                    style={styles.fabStyle}
                    onClick={this.floatingButtonClicked}
                >
                    <Add />
                </Fab>
                <Modal ref={ref => (this.modal = ref)}>
                    <SubjectCreation onSubjectSave={this.onSubjectSave} />
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
