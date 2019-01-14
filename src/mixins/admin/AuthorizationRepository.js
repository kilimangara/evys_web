import { authorize } from '../../reducers/admin/authorization'

export default superclass => class AuthorizationRepository extends superclass {}

export class AuthorizationProvider {
    static mapStateToProps = state => ({
        isLogged: state.authorization.token
    })

    static mapDispatchToProps = {
        authorize
    }
}
