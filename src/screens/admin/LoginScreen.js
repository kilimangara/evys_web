import React, { Component } from 'react'
import { ColoredContainer } from '../../components/styled/common'
import { AuthButton, AuthCard, AuthCardContent, AuthField } from '../../components/styled/authorization'
import { Button } from '@material-ui/core'
import { theme } from '../../utils/global_theme'
import AuthorizationMixin, { AuthorizationProvider } from '../../mixins/admin/AuthorizationRepository'
import withProviders from '../../utils/withProviders'
import { omit } from 'lodash'

class LoginScreen extends AuthorizationMixin(Component) {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.isLogged) this.props.history.push('/admin')
    }

    handleChange = field => e => {
        let obj = {}
        obj[field] = e.target.value
        obj.errors = omit(this.state.errors, [field])
        this.setState(obj)
    }

    handlePress = e => {
        e.preventDefault()
        this.doAuth()
    }

    render() {
        const { email, password, loginFailed } = this.state
        return (
            <ColoredContainer backgroundColor={theme.BACKGROUND_DARK}>
                <form onSubmit={this.handlePress}>
                    <AuthCard>
                        <AuthCardContent>
                            <AuthField
                                name="email"
                                label="Почта"
                                value={email}
                                fullWidth
                                margin={'normal'}
                                onChange={this.handleChange('email')}
                                variant="outlined"
                            />
                            <AuthField
                                name="password"
                                label="Пароль"
                                value={password}
                                error={!!this.getErrors('password')}
                                helperText={this.getErrors('password')}
                                fullWidth
                                margin={'normal'}
                                type="password"
                                onChange={this.handleChange('password')}
                                variant="outlined"
                            />
                            <AuthButton type="submit" fullWidth variant="contained" color={theme.ACCENT_COLOR}>
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
                </form>
            </ColoredContainer>
        )
    }
}

export default withProviders(AuthorizationProvider)(LoginScreen)
