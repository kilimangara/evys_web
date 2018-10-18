import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { grey900 } from 'material-ui/styles/colors'
import bind from 'memoize-bind'
import SubjectPicker from './SubjectPicker'
import Checkbox from 'material-ui/Checkbox'

export default class CreateTariff extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.initialState
    }

    textFieldChanged = (field, event, newValue) => {
        this.setState({
            [field]: newValue
        })
    }

    handleSubjectChange = subjects => {
        this.setState({ subjects })
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.initialState)
    }

    render() {
        return (
            <div style={styles.container}>
                <TextField
                    onChange={bind(this.textFieldChanged, this, 'name')}
                    hintText="Название"
                    value={this.state.name}
                    underlineFocusStyle={{ borderColor: grey900 }}
                />
                <TextField
                    onChange={bind(this.textFieldChanged, this, 'amount')}
                    hintText="Стоимость"
                    value={this.state.amount}
                    type={'number'}
                    inputStyle={{ step: 'any' }}
                    underlineFocusStyle={{ borderColor: grey900 }}
                />
                <TextField
                    onChange={bind(this.textFieldChanged, this, 'description')}
                    hintText="Описание"
                    value={this.state.description}
                    underlineFocusStyle={{ borderColor: grey900 }}
                />
                <TextField
                    onChange={bind(this.textFieldChanged, this, 'description_private')}
                    hintText="Скрытое описание"
                    value={this.state.description_private}
                    underlineFocusStyle={{ borderColor: grey900 }}
                />
                <SubjectPicker subjects={this.state.subjects} onSubjectsChanged={this.handleSubjectChange} />
                <Checkbox
                    label="Скрыто"
                    checked={this.state.is_hidden}
                    onCheck={this.textFieldChanged.bind(this, 'is_hidden')}
                    inputStyle={{ color: grey900 }}
                />
                <RaisedButton
                    label="Сохранить"
                    labelStyle={{ color: 'white' }}
                    backgroundColor={grey900}
                    onClick={this.props.onTariffSave.bind(this, this.state)}
                />
                {this.props.updateMode && (
                    <RaisedButton
                        label="Удалить"
                        style={{ marginTop: 20 }}
                        labelStyle={{ color: 'white' }}
                        backgroundColor={grey900}
                        onClick={this.props.onTariffSave.bind(this, this.state.id)}
                    />
                )}
            </div>
        )
    }
}

CreateTariff.defaultProps = {
    onTariffSave: data => {},
    onTariffDelete: id => {},
    updateMode: false,
    initialState: {
        id: undefined,
        name: '',
        hidden: false,
        amount: 0,
        description: '',
        description_private: '',
        subjects: []
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
