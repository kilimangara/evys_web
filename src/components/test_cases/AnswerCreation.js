import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { grey900 } from 'material-ui/styles/colors'
import Checkbox from 'material-ui/Checkbox'
import bind from 'memoize-bind'

export default class AnswerCreation extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.initialState
    }

    textFieldChanged = (field, event, newValue) => {
        this.setState({
            [field]: newValue
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.initialState)
    }

    render() {
        return (
            <div style={styles.container}>
                <TextField
                    onChange={bind(this.textFieldChanged, this, 'content')}
                    hintText="Название"
                    value={this.state.content}
                    underlineFocusStyle={{ borderColor: grey900 }}
                />
                <Checkbox
                    label="Правильный"
                    checked={this.state.is_right}
                    onCheck={bind(this.textFieldChanged, this, 'is_right')}
                    inputStyle={{ color: grey900 }}
                />
                <RaisedButton
                    label="Создать"
                    labelStyle={{ color: 'white' }}
                    backgroundColor={grey900}
                    onClick={this.props.onAnswerSaved.bind(this, this.state)}
                />
            </div>
        )
    }
}

AnswerCreation.defaultProps = {
    onAnswerSaved: data => {},
    initialState: {
        content: '',
        is_right: false
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
