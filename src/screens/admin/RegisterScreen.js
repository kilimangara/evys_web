import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import {TextField, Button} from '@material-ui/core'
import { createUser, saveCredentials, resetCredentials } from '../../actions/admin/AccountActions'
import _ from 'lodash'
import bind from 'memoize-bind'
import { grey900 } from 'material-ui/styles/colors'
import { ColoredContainer } from '../../components/styled/common'
import { AuthCard, AuthCardContent } from '../../components/styled/authorization'

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
                console.log(error.response)
            })
    }

    render() {
        const { email, password, errors, username, first_name, passwordRepeat } = this.state

        return (
            <ColoredContainer backgroundColor={'#3b3a3f'}>
                <AuthCard>
                    <AuthCardContent>
                        <TextField
                            label="Логин"
                            value={username}
                            onChange={bind(this.handleChange, this, 'username')}
                            variant="outlined"
                        />
                        <TextField
                            label="Имя"
                            value={first_name}
                            onChange={bind(this.handleChange, this, 'first_name')}
                            variant="outlined"
                        />
                        <TextField
                            label="Почта"
                            value={email}
                            onChange={bind(this.handleChange, this, 'email')}
                            variant="outlined"
                        />
                        <TextField
                            label="Пароль"
                            value={password}
                            type="password"
                            onChange={bind(this.handleChange, this, 'password')}
                            variant="outlined"
                        />
                        <TextField
                            label="Повторите пароль"
                            value={passwordRepeat}
                            type="password"
                            errorText={errors.passwordRepeat}
                            onChange={bind(this.handleChange, this, 'passwordRepeat')}
                            variant="outlined"
                        />
                        <RaisedButton label="Создать" primary={true} onClick={this.handlePress} variant="outlined" />
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
    { createUser, saveCredentials, resetCredentials }
)(RegisterScreen)
