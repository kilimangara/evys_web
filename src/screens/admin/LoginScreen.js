import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadAccount, saveCredentials, resetCredentials } from '../../actions/admin/AccountActions'
import { ColoredContainer } from '../../components/styled/common'
import { AuthButton, AuthCard, AuthCardContent, AuthField } from '../../components/styled/authorization'
import { switchAdminApp } from '../../actions/AppActions'
import { Button } from '@material-ui/core'
import { theme } from '../../utils/global_theme'

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
        this.props.switchAdminApp()
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
                if (response.response && response.response.data && response.response.data.error) {
                    this.props.resetCredentials()
                    this.setState({
                        password: '',
                        loginFailed: true
                    })
                } else {
                    this.props.history.push('/admin/choose_account')
                    this.setState({
                        email: '',
                        password: '',
                        loginFailed: false
                    })
                }
            })
            .catch(error => {
                this.props.resetCredentials()
                this.setState({
                    password: '',
                    loginFailed: true
                })
            })
    }

    render() {
        const { email, password, loginFailed } = this.state

        return (
            <ColoredContainer backgroundColor={theme.BACKGROUND_DARK}>
                <AuthCard>
                    <AuthCardContent>
                        <AuthField
                            name="login"
                            label="Логин"
                            value={email}
                            fullWidth
                            error={loginFailed && !email && !password}
                            margin={'normal'}
                            onChange={e => this.handleChange(e)}
                            variant="outlined"
                        />
                        <AuthField
                            name="password"
                            label="Пароль"
                            value={password}
                            error={loginFailed && !email && !password}
                            helperText={
                                (loginFailed &&
                                    !email &&
                                    !password &&
                                    'Проверьте правильность ввода e-mail и пароля') ||
                                null
                            }
                            fullWidth
                            margin={'normal'}
                            type="password"
                            onChange={e => this.handleChange(e)}
                            variant="outlined"
                        />
                        <AuthButton fullWidth onClick={this.handlePress} variant="contained" color={theme.ACCENT_COLOR}>
                            Войти
                        </AuthButton>
                        <AuthButton
                            fullWidth
                            color={theme.PRIMARY}
                            onClick={() => this.props.history.push('/admin/register')}
                            variant="contained"
                        >
                            Еще нет аккаунта? Создайте прямо сейчас!
                        </AuthButton>
                    </AuthCardContent>
                </AuthCard>
            </ColoredContainer>
        )
    }
}

const mapStateToProps = state => ({
    isLogged: state.auth_admin.authenticated
})

export default connect(
    mapStateToProps,
    { loadAccount, saveCredentials, resetCredentials, switchAdminApp }
)(LoginScreen)
