import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { grey900 } from 'material-ui/styles/colors'
import DurationPicker from './DurationPicker'
import Checkbox from 'material-ui/Checkbox'
import moment from 'moment'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

export default class ThemeCreation extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.initialState
    }

    saveToState = (field, event, value) => {
        this.setState({
            [field]: value
        })
    }

    saveToStateDuration = (field, value) => {
        this.setState({
            [field]: value
        })
    }

    saveToStateSelectField = (field, event, index, value) => {
        this.setState({
            [field]: value
        })
    }

    toInternalValue = isoString => {
        return moment.duration(isoString).asHours()
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.initialState)
    }

    render() {
        const { name, num, is_hidden, tests_model_type, end_range, repetition_range, required_repeats } = this.state
        return (
            <div style={styles.container}>
                <TextField
                    onChange={this.saveToState.bind(this, 'name')}
                    floatingLabelText="Название"
                    value={name}
                    underlineFocusStyle={{ borderColor: grey900 }}
                />
                <TextField
                    onChange={this.saveToState.bind(this, 'num')}
                    floatingLabelText="Номер"
                    value={num}
                    type={'number'}
                    underlineFocusStyle={{ borderColor: grey900 }}
                />
                <TextField
                    onChange={this.saveToState.bind(this, 'required_repeats')}
                    floatingLabelText="Минимальное число повторений"
                    value={required_repeats}
                    type={'number'}
                    underlineFocusStyle={{ borderColor: grey900 }}
                />
                <SelectField
                    floatingLabelText="Модель вопросов"
                    value={tests_model_type}
                    onChange={this.saveToStateSelectField.bind(this, 'tests_model_type')}
                    autoWidth={true}
                >
                    <MenuItem value={0} primaryText="Линейная модель" />
                    <MenuItem value={1} primaryText="Древовидная модель" />
                    <MenuItem value={2} primaryText="Стандартная модель" />
                </SelectField>
                <DurationPicker
                    valueChanged={this.saveToStateDuration.bind(this, 'repetition_range')}
                    defaultValue={this.toInternalValue(repetition_range)}
                    labelText={'Время между повторениями'}
                />
                <DurationPicker
                    valueChanged={this.saveToStateDuration.bind(this, 'end_range')}
                    defaultValue={this.toInternalValue(end_range)}
                    labelText={'Время между напоминаниями'}
                />
                <Checkbox
                    label="Скрыто"
                    checked={is_hidden}
                    onCheck={this.saveToState.bind(this, 'is_hidden')}
                    inputStyle={{ color: grey900 }}
                />
                <RaisedButton
                    label="Сохранить"
                    labelStyle={{ color: 'white' }}
                    backgroundColor={grey900}
                    onClick={this.props.onThemeSave.bind(this, this.state)}
                />
                {this.props.updateMode && (
                    <RaisedButton
                        label="Удалить"
                        labelStyle={{ color: 'white' }}
                        backgroundColor={grey900}
                        onClick={this.props.onThemeDelete.bind(this, this.state.id)}
                    />
                )}
            </div>
        )
    }
}

ThemeCreation.defaultProps = {
    onThemeSave: data => {},
    onThemeDelete: id => {},
    updateMode: false,
    initialState: {
        num: 0,
        name: '',
        is_hidden: true,
        tests_model_type: 2,
        end_range: '24:00:00',
        repetition_range: '03:00:00',
        required_repeats: 3
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 36
    }
}
