import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { omit } from 'lodash'
import { ColoredContainer } from '../../components/styled/common'
import { AuthButton, AuthField, AuthCard, AuthCardContent } from '../../components/styled/authorization'
import { theme } from '../../utils/global_theme'
import AuthorizationMixin, { AuthorizationProvider } from '../../mixins/admin/AuthorizationRepository'
import withProviders from '../../utils/withProviders'

class RegisterScreen extends AuthorizationMixin(Component) {
    constructor(props) {
        super(props)
        this.state = {
            accountName: '',
            email: '',
            password: '',
            firstName: '',
            passwordRepeat: '',
            passwordInconsistency: false,
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.isLogged) this.props.history.push('/admin/choose_account')
    }

    handleChange = field => event => {
        const { errors } = this.state
        if (field === 'password' || field === 'passwordRepeat') delete errors.passwordRepeat
        if (field === 'password') delete errors.password
        if (field === 'email') delete errors.email
        if (field === 'accountName') delete errors.accountName

        this.setState({ [field]: event.target.value, errors })
    }

    handleRegister = e => {
        e.preventDefault()
        this.doRegister()
    }

    render() {
        const { email, password, errors, accountName, firstName, passwordRepeat } = this.state
        console.log(errors)
        return (
            <ColoredContainer backgroundColor={theme.BACKGROUND_DARK}>
                <form onSubmit={this.handleRegister}>
                    <AuthCard>
                        <AuthCardContent>
                            <AuthField
                                label="Название вашей онлайн-школы"
                                value={accountName}
                                onChange={this.handleChange('accountName')}
                                margin={'normal'}
                                error={!!this.getErrors('accountName')}
                                helperText={this.getErrors('accountName')}
                                fullWidth
                                variant={'outlined'}
                            />
                            <AuthField
                                label="Имя"
                                value={firstName}
                                onChange={this.handleChange('firstName')}
                                margin={'normal'}
                                fullWidth
                                variant={'outlined'}
                            />
                            <AuthField
                                label="Почта"
                                value={email}
                                onChange={this.handleChange('email')}
                                error={!!this.getErrors('email')}
                                helperText={this.getErrors('email')}
                                margin={'normal'}
                                fullWidth
                                variant={'outlined'}
                            />
                            <AuthField
                                label="Пароль"
                                value={password}
                                type="password"
                                onChange={this.handleChange('password')}
                                margin={'normal'}
                                error={!!this.getErrors('password')}
                                helperText={this.getErrors('password')}
                                fullWidth
                                variant={'outlined'}
                            />
                            <AuthField
                                label="Повторите пароль"
                                value={passwordRepeat}
                                type="password"
                                error={!!this.getErrors('passwordRepeat')}
                                helperText={this.getErrors('passwordRepeat')}
                                onChange={this.handleChange('passwordRepeat')}
                                margin={'normal'}
                                fullWidth
                                variant={'outlined'}
                            />
                            <AuthButton color={theme.PRIMARY} fullWidth type="submit" variant="contained">
                                Создать
                            </AuthButton>
                        </AuthCardContent>
                    </AuthCard>
                </form>
            </ColoredContainer>
        )
    }
}

export default withProviders(AuthorizationProvider)(RegisterScreen)
