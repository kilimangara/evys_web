import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import DurationPicker from './DurationPicker'
import Checkbox from '@material-ui/core/Checkbox'
import moment from 'moment'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export default class ThemeCreation extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.initialState
    }

    saveToState = field => (event, newValue) => {
        let value = event.target.value
        if (field === 'isHidden') value = newValue
        if (field === 'num' && value === '') value = null
        this.setState({
            [field]: value
        })
    }

    saveToStateDuration = field => value => {
        this.setState({
            [field]: value
        })
    }

    toInternalValue = isoString => {
        return moment.duration(isoString).asHours()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.initialState !== this.props.initialState) this.setState(this.props.initialState)
    }

    render() {
        const { name, num, isHidden, testsModelType, endRange, repetitionRange, requiredRepeats } = this.state
        return (
            <div style={styles.container}>
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
                    label="Номер"
                    value={num || ''}
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
                <Button color="primary" onClick={this.props.onThemeSave.bind(this, this.state)}>
                    Сохранить
                </Button>
            </div>
        )
    }
}

ThemeCreation.defaultProps = {
    onThemeSave: data => {},
    onThemeDelete: id => {},
    updateMode: false,
    initialState: {
        num: null,
        name: '',
        isHidden: true,
        testsModelType: 2,
        endRange: '24:00:00',
        repetitionRange: '03:00:00',
        requiredRepeats: 3
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 36
    }
}
