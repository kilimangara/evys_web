import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import { grey900 } from 'material-ui/styles/colors'
import TextField from '@material-ui/core/TextField'
import { loadAccount, saveCredentials, resetCredentials } from '../../actions/admin/AccountActions'
import { ColoredContainer } from '../../components/styled/common'
import { LoginCard, LoginCardContent, LoginField } from '../../components/styled/loginScreen'

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: undefined,
            password: undefined,
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
        const { email, password, loginFailed } = this.state

        const fieldStyle = {
            display: 'block',
            margin: '20px'
        }

        const slideDown = {
            display: 'block',
            marginTop: '20px'
        }

        return (
            <ColoredContainer backgroundColor={'#3b3a3f'}>
                <LoginCard>
                    <LoginCardContent>
                        <TextField
                            id="1"
                            name="login"
                            label="Логин"
                            value={email}
                            margin={'normal'}
                            onChange={e => this.handleChange(e)}
                            variant="outlined"
                        />
                        <LoginField
                            id="2"
                            name="password"
                            label="Пароль"
                            value={password}
                            fullWidth
                            type="password"
                            onChange={e => this.handleChange(e)}
                            variant={'outlined'}
                        />
                        <RaisedButton
                            style={loginFailed ? slideDown : fieldStyle}
                            label="Войти"
                            fullWidth
                            primary={true}
                            onClick={this.handlePress}
                        />
                        <RaisedButton
                            style={loginFailed ? slideDown : fieldStyle}
                            label="Еще нет аккаунта? Создайте прямо сейчас!"
                            backgroundColor={grey900}
                            fullWidth
                            labelStyle={{ color: 'white' }}
                            onClick={() => this.props.history.push('/admin/register')}
                        />
                    </LoginCardContent>
                </LoginCard>
            </ColoredContainer>
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
