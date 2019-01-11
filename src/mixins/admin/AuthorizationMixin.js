import { connect } from 'react-redux'
import { authorize } from '../../reducers/admin/authorization'

export default superclass => {
  class AuthorizationMixin extends superclass {


  }

  const mapStateToProps = state => ({
    isLogged: state.authorization.token
  })

  const mapDispatchToProps = {
    authorize
  }

  return connect(mapStateToProps, mapDispatchToProps)(superclass)
}
