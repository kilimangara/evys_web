import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import DurationPicker from '../../../components/themes/DurationPicker'
import Checkbox from '@material-ui/core/Checkbox'
import moment from 'moment'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Card } from './index'
import SaveButton from '../../../components/common/SaveButton'
import produce from 'immer'

export default class ThemeSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: this.props.theme
        }
    }

    saveToState = field => (event, newValue) => {
        let value = event.target.value
        if (field === 'isHidden') value = newValue
        if (field === 'num' && value === '') value = null
        this.setState(
            produce(this.state, draft => {
                draft.theme[field] = value
            }),
            () => this.props.onThemeUpdate(this.state.theme)
        )
    }

    saveToStateDuration = field => value => {
        this.setState(
            produce(this.state, draft => {
                draft.theme[field] = value
            }),
            () => this.props.onThemeUpdate(this.state.theme)
        )
    }

    saveTheme = () => {
        this.props.saveTheme().then(() => this.saveButton.success())
    }

    toInternalValue = isoString => {
        return moment.duration(isoString).asHours()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.theme !== this.props.theme) this.setState({ theme: this.props.theme })
    }

    render() {
        const {
            name,
            num,
            isHidden,
            testsModelType,
            endRange,
            repetitionRange,
            requiredRepeats,
            questionsOrder
        } = this.state.theme
        return (
            <Card marginTop={12}>
                <TextField
                    onChange={this.saveToState('name')}
                    value={name}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label="Название"
                />
                <TextField
                    onChange={this.saveToState('num')}
                    label="Порядковый номер"
                    value={num == null ? '' : num}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type={'number'}
                />
                <TextField
                    onChange={this.saveToState('requiredRepeats')}
                    label="Минимальное число повторений"
                    value={requiredRepeats}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    type={'number'}
                />
                <TextField
                    select
                    variant="outlined"
                    margin="normal"
                    label="Порядок вопросов"
                    fullWidth
                    value={questionsOrder}
                    onChange={this.saveToState('questionsOrder')}
                >
                    <MenuItem value={'random'}>Случайный</MenuItem>
                    <MenuItem value={'num'}>По очереди</MenuItem>
                </TextField>
                <TextField
                    select
                    variant="outlined"
                    margin="normal"
                    label="Модель вопросов"
                    fullWidth
                    value={testsModelType}
                    onChange={this.saveToState('testsModelType')}
                >
                    <MenuItem value={0}>Линейная модель</MenuItem>
                    <MenuItem value={1}>Древовидная модель</MenuItem>
                    <MenuItem value={2}>Стандартная модель</MenuItem>
                </TextField>
                <DurationPicker
                    valueChanged={this.saveToStateDuration('repetitionRange')}
                    defaultValue={this.toInternalValue(repetitionRange)}
                    labelText={'Время между повторениями'}
                />
                <DurationPicker
                    valueChanged={this.saveToStateDuration('endRange')}
                    defaultValue={this.toInternalValue(endRange)}
                    labelText={'Время между напоминаниями'}
                />
                <SaveButton
                    ref={ref => (this.saveButton = ref)}
                    loading={this.props.fetching}
                    onClick={this.saveTheme}
                />
            </Card>
        )
    }
}
