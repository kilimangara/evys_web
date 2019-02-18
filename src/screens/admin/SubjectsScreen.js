import React, { Component } from 'react'
import { connect } from 'react-redux'
import GridList from '@material-ui/core/GridList'
import Fab from '@material-ui/core/Fab'
import Add from '@material-ui/icons/Add'
import Modal from 'reboron/ScaleModal'
import SubjectCreation from '../../components/subjects/SubjectCreation'
import { Subject } from '../../components/subjects/Subject'
import SubjectRepository, { SubjectProvider } from '../../mixins/admin/SubjectRepository'
import withProviders from '../../utils/withProviders'
import styled from 'styled-components'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withSnackbar } from 'notistack'

const GridWrapper = styled.div`
    @media screen and (min-width: 0px) and (max-width: 1090px) {
        max-width: 374px;
    }
    @media screen and (min-width: 1090px) and (max-width: 1422px) {
        max-width: 748px;
    }
    @media screen and (min-width: 1422px) and (max-width: 1796px) {
        max-width: 1122px;
    }
    @media screen and (min-width: 1796px) {
        max-width: 1496px;
    }
    width: 5000px;
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
            this.props.enqueueSnackbar('Предмет создан')
            this.props.loadSubjects()
            this.modal.hide()
        }).catch(({response}) => {
            if(response.status === 402)
              this.props.enqueueSnackbar('Ваш тарифный план не поддерживает большее кол-во предметов', {variant: 'error'})
        })
    }

    render() {
        const {subjects, subjectsFetching} = this.props
        if(!subjects.length && subjectsFetching){
          return(
            <div>
              <LinearProgress/>
            </div>
          )
        }
        return (
            <div style={styles.container}>
                <GridWrapper>
                    {this.props.subjects.map(subject => (
                      <div style={{margin: '18px 6px'}} key={subject.id}>
                        <Subject
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

export default withProviders(SubjectProvider)(withSnackbar(SubjectsScreen))
