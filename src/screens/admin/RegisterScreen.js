import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { createUser, saveCredentials, resetCredentials } from '../../actions/admin/AccountActions'
import _ from 'lodash'
import bind from 'memoize-bind'
import { ColoredContainer } from '../../components/styled/common'
import { AuthButton, AuthField, AuthCard, AuthCardContent } from '../../components/styled/authorization'
import { theme } from '../../utils/global_theme'
import { switchAdminApp } from '../../actions/AppActions'

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
        this.props.switchAdminApp()
        if (this.props.isLogged) this.props.history.push('/admin/choose_account')
    }

    handleChange = (field, event) => {
        const { errors } = this.state
        if (field === 'password' || field === 'passwordRepeat') delete errors.passwordRepeat
        if (field === 'password') delete errors.password
        if (field === 'username') delete errors.username
        if (field === 'email') delete errors.email

        this.setState({ [field]: event.target.value, errors })
    }

    handlePress = () => {
        if (this.state.password !== this.state.passwordRepeat) {
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
                this.setState({ errors: error.response.data })
            })
    }

    render() {
        const { email, password, errors, username, first_name, passwordRepeat } = this.state

        return (
            <ColoredContainer backgroundColor={theme.BACKGROUND_DARK}>
                <AuthCard>
                    <AuthCardContent>
                        <AuthField
                            label="Логин"
                            value={username}
                            onChange={bind(this.handleChange, this, 'username')}
                            margin={'normal'}
                            error={errors.username}
                            helperText={errors.username}
                            fullWidth
                            variant={'outlined'}
                        />
                        <AuthField
                            label="Имя"
                            value={first_name}
                            onChange={bind(this.handleChange, this, 'first_name')}
                            margin={'normal'}
                            fullWidth
                            variant={'outlined'}
                        />
                        <AuthField
                            label="Почта"
                            value={email}
                            onChange={bind(this.handleChange, this, 'email')}
                            error={errors.email}
                            helperText={errors.email}
                            margin={'normal'}
                            fullWidth
                            variant={'outlined'}
                        />
                        <AuthField
                            label="Пароль"
                            value={password}
                            type="password"
                            onChange={bind(this.handleChange, this, 'password')}
                            margin={'normal'}
                            error={errors.password}
                            helperText={errors.password}
                            fullWidth
                            variant={'outlined'}
                        />
                        <AuthField
                            label="Повторите пароль"
                            value={passwordRepeat}
                            type="password"
                            error={errors.passwordRepeat}
                            helperText={errors.passwordRepeat}
                            onChange={bind(this.handleChange, this, 'passwordRepeat')}
                            margin={'normal'}
                            fullWidth
                            variant={'outlined'}
                        />
                        <AuthButton color={theme.PRIMARY} fullWidth onClick={this.handlePress} variant="contained">
                            Создать
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
    { createUser, saveCredentials, resetCredentials, switchAdminApp }
)(RegisterScreen)
