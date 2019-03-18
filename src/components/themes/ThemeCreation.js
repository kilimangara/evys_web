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
        const { type, name, num } = this.state
        return (
            <div style={styles.container}>
                <TextField
                    select
                    variant="outlined"
                    margin="normal"
                    label="Раздил или тема?"
                    fullWidth
                    value={type}
                    onChange={this.saveToState('type')}
                >
                    <MenuItem value={'Theme'}>Тема</MenuItem>
                    <MenuItem value={'Section'}>Раздел</MenuItem>
                </TextField>
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
        type: 'Theme',
        num: null,
        name: '',
        isHidden: true,
        testsModelType: 2,
        endRange: '03:00:00',
        repetitionRange: '24:00:00',
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
