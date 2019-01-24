import { authorize } from '../../reducers/admin/authorization'

export default superclass => class AuthorizationRepository extends superclass {

  getErrors = (field) => {
    const errors = this.state.errors[field]
    if(errors == undefined) return errors
    if(errors instanceof Array) return errors.join(', ')
    return errors
  }

  doAuth = (login, password) => {
    this.props.authorize(login, password)
        .then(({data}) => {
          this.props.history.push('/admin/choose_account')
          this.setState({
              email: '',
              password: '',
              errors: {}
          })
        })
        .catch(({response})=>{
          if(response && response.data){
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
        isLogged: state.authorization.token
    })

    static mapDispatchToProps = {
        authorize
    }
}
