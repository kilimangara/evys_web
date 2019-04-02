import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { createSubjectStudentEvent } from '../../../api'
import { InlineDatePicker } from 'material-ui-pickers'
import Dialog from '@material-ui/core/Dialog'
import produce from 'immer'
import fe from '../../../utils/get-errors'
import SaveButton from '../../../components/common/SaveButton'
import { EventCreationWrapper } from '../../../components/styled/admin/Event'
import startOfDay from 'date-fns/startOfDay'
import format from 'date-fns/format'

class CreateEvent extends React.Component {
    state = {
        open: false,
        themeId: null,
        studentId: null,
        subjectId: null,
        errors: {},
        data: {
            title: '',
            expiresAt: null,
            description: ''
        }
    }

    show = ({ themeId, studentId, subjectId }) => {
        this.setState({ themeId, studentId, subjectId })
        this.openModal()
    }

    openModal = () => {
        this.setState({ open: true })
    }

    closeModal = () => {
        this.setState({
            open: false,
            themeId: null,
            studentId: null,
            subjectId: null,
            errors: {},
            data: {
                title: '',
                expiresAt: null,
                description: ''
            }
        })
    }

    fieldChanged = name => event => {
        let value = null
        if (name === 'expiresAt') value = startOfDay(event)
        else value = event.target.value
        this.setState(
            produce(draft => {
                draft.data[name] = value
            })
        )
    }

    prepareData = themeId => {
        const { data } = this.state
        return {
            ...data,
            themeId,
            expiresAt: format(data.expiresAt, 'yyyy-MM-dd') + 'T00:00'
        }
    }

    saveEvent = () => {
        const { themeId, subjectId, studentId, data } = this.state
        createSubjectStudentEvent(subjectId, studentId, this.prepareData(themeId))
            .then(({ data }) => {
                console.log('GOTOVO', data)
            })
            .catch(({ response }) => {
                console.log('NE ZAEBIS', response.data)
                this.setState({ errors: response.data })
            })
    }

    render() {
        const { open, data, errors } = this.state
        console.log(this.state)
        return (
            <Dialog open={open} onClose={this.closeModal}>
                <EventCreationWrapper>
                    <TextField
                        onChange={this.fieldChanged('title')}
                        label={'Цель задания'}
                        variant="outlined"
                        error={!!fe(errors, 'title')}
                        helperText={fe(errors, 'title')}
                        value={data.title}
                        fullWidth
                        margin={'normal'}
                    />
                    <TextField
                        onChange={this.fieldChanged('description')}
                        label={'Описание задания'}
                        variant="outlined"
                        multiline
                        error={!!fe(errors, 'description')}
                        helperText={fe(errors, 'description')}
                        value={data.description}
                        margin={'normal'}
                        fullWidth
                        rows={5}
                        rowsMax={20}
                    />
                    <InlineDatePicker
                        onlyCalendar
                        fullWidth
                        disablePast
                        format={'MM.dd.yyyy'}
                        margin={'normal'}
                        variant="outlined"
                        label="Выполнить до"
                        value={data.expiresAt}
                        onChange={this.fieldChanged('expiresAt')}
                    />
                    <div>
                        <SaveButton ref={ref => (this.saveButton = ref)} onClick={this.saveEvent} />
                    </div>
                </EventCreationWrapper>
            </Dialog>
        )
    }
}

export default CreateEvent
