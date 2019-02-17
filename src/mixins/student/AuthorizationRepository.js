import { getCodeByPhoneNumber, validateCode, saveStepIndex, removeIsNew } from '../../reducers/student/auth'

export default superclass => class AuthorizationRepository extends superclass {}

export class AuthorizationProvider {
    static mapStateToProps = state => ({
        authenticated: state.auth.authenticated,
        userId: state.auth.user_id,
        stepIndex: state.auth.stepIndex,
        isNew: state.auth.isNew,
        token: state.auth.token
    })

    static mapDispatchToProps = {
        getCodeByPhoneNumber,
        validateCode,
        saveStepIndex,
        removeIsNew
    }
}
