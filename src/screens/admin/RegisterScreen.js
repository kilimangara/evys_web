import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import { createUser, saveCredentials, resetCredentials } from '../../actions/admin/AccountActions'
import _ from 'lodash'
import bind from 'memoize-bind'
import { grey900 } from 'material-ui/styles/colors'

class RegisterScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            first_name: '',
            email: '',
            passwordRepeat: '',
            passwordInconsistency: false,
            errors: {}
        }
    }

    componentWillMount() {
        if (this.props.isLogged) this.props.history.push('/admin/choose_account')
    }

    handleChange = (field, event, value) => {
        const { errors } = this.state
        if (field === 'password' || field === 'passwordRepeat') delete errors.passwordRepeat
        this.setState({ [field]: value, errors })
    }

    handlePress = () => {
        if (this.state.password != this.state.passwordRepeat) {
            this.setState({ errors: { ...this.state.errors, passwordRepeat: 'Пароли не совпадают' } })
            return
        }
        this.props
            .createUser(_.omit(this.state, ['errors', 'passwordRepeat']))
            .then(response => {
                this.props.saveCredentials(this.state.username, this.state.password)
                this.props.history.push('/admin/choose_account')
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    render() {
        let { email, password, errors, username, first_name, passwordRepeat } = this.state
        const style = {
            display: 'flex',
            margin: 'auto',
            flexDirection: 'column',
            padding: 12
        }

        const fieldStyle = {
            display: 'block',
            margin: '20px'
        }

        const slideDown = {
            display: 'block',
            marginTop: '20px'
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Card style={style}>
                    <TextField
                        style={fieldStyle}
                        floatingLabelText="Логин"
                        value={username}
                        onChange={bind(this.handleChange, this, 'username')}
                    />
                    <TextField
                        style={fieldStyle}
                        floatingLabelText="Имя"
                        value={first_name}
                        onChange={bind(this.handleChange, this, 'first_name')}
                    />
                    <TextField
                        style={fieldStyle}
                        floatingLabelText="Почта"
                        value={email}
                        onChange={bind(this.handleChange, this, 'email')}
                    />
                    <TextField
                        style={fieldStyle}
                        floatingLabelText="Пароль"
                        value={password}
                        type="password"
                        onChange={bind(this.handleChange, this, 'password')}
                    />
                    <TextField
                        style={fieldStyle}
                        floatingLabelText="Повторите пароль"
                        value={passwordRepeat}
                        type="password"
                        errorText={errors.passwordRepeat}
                        onChange={bind(this.handleChange, this, 'passwordRepeat')}
                    />
                    <RaisedButton style={fieldStyle} label="Создать" primary={true} onClick={this.handlePress} />
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLogged: state.auth_admin.authenticated
})

export default connect(
    mapStateToProps,
    { createUser, saveCredentials, resetCredentials }
)(RegisterScreen)
