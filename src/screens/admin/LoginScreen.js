import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import { grey900 } from 'material-ui/styles/colors'
import { loadAccount, saveCredentials, resetCredentials } from '../../actions/admin/AccountActions'

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            loginFailed: false
        }
    }

    componentWillMount() {
        if (this.props.isLogged) this.props.history.push('/admin/choose_account')
    }

    handleChange = e => {
        let field = e.target.name === 'login' ? 'email' : 'password'
        let obj = {}
        obj[field] = e.target.value
        this.setState(obj)
    }

    handlePress = () => {
        this.props.saveCredentials(this.state.email, this.state.password)
        this.props
            .loadAccount()
            .then(response => {
                this.props.history.push('/admin/choose_account')
                this.setState({
                    email: '',
                    password: '',
                    loginFailed: false
                })
            })
            .catch(error => {
                this.props.resetCredentials()
                this.setState({
                    email: '',
                    password: '',
                    loginFailed: true
                })
            })
    }

    render() {
        let { email, password, loginFailed } = this.state
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
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Card style={style}>
                    <TextField
                        style={fieldStyle}
                        name="login"
                        floatingLabelText="Логин"
                        value={email}
                        onChange={e => this.handleChange(e)}
                    />
                    <TextField
                        style={fieldStyle}
                        name="password"
                        floatingLabelText="Пароль"
                        value={password}
                        type="password"
                        errorText={loginFailed ? 'Логин или пароль введены неверно' : null}
                        onChange={e => this.handleChange(e)}
                    />
                    <RaisedButton
                        style={loginFailed ? slideDown : fieldStyle}
                        label="Войти"
                        primary={true}
                        onClick={this.handlePress}
                    />

                    <RaisedButton
                        style={loginFailed ? slideDown : fieldStyle}
                        label="Еще нет аккаунта? Создайте прямо сейчас!"
                        backgroundColor={grey900}
                        labelStyle={{ color: 'white' }}
                        onClick={() => this.props.history.push('/admin/register')}
                    />
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
    { loadAccount, saveCredentials, resetCredentials }
)(LoginScreen)
