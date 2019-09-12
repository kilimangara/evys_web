import { authorize, register } from '../../reducers/admin/authorization'
import { loadAccounts, chooseAccount } from '../../reducers/admin/account'
import { omit } from 'lodash'

export default superclass =>
    class AuthorizationRepository extends superclass {
        getErrors = field => {
            const errors = this.state.errors[field]
            if (errors == undefined) return errors
            if (errors instanceof Array) return errors.join(', ')
            return errors
        }

        afterAuth = () => {
            this.props.loadAccounts().then(accounts => {
                this.props.chooseAccount(accounts[0].permalink)
                this.props.history.push('/admin')
            })
        }

        doRegister = () => {
            const { password, email, passwordRepeat, errors, accountName } = this.state
            if (password !== passwordRepeat) {
                this.setState({ errors: { ...errors, passwordRepeat: 'Пароли не совпадают' } })
                return
            }
            this.props
                .register(_.omit(this.state, ['errors', 'passwordRepeat']))
                .then(() => this.afterAuth())
                .catch(error => {
                    this.setState({ errors: error.response.data })
                })
        }

        doAuth = () => {
            const { email, password } = this.state
            this.props
                .authorize(email, password)
                .then(() => this.afterAuth())
                .catch(({ response }) => {
                    if (response && response.data) {
                        this.setState({
                            password: '',
                            errors: { password: 'Неправильное сочетание логин/пароль' }
                        })
                    }
                })
        }

        isLogged = () => this.props.isLogged
    }

export class AuthorizationProvider {
    static mapStateToProps = state => ({
        isLogged: Boolean(state.authorization.token) || state.authorization.type == 'session'
    })

    static mapDispatchToProps = {
        authorize,
        register,
        loadAccounts,
        chooseAccount
    }
}
