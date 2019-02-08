import { loadProfileData, saveProfile } from '../../reducers/student/account'

export default superclass => class AccountRepository extends superclass {}

export class AccountProvider {
    static mapStateToProps = state => ({
        profileData: state.account.profileData,
        fetching: state.account.fetching
    })

    static mapDispatchToProps = {
        loadProfileData,
        saveProfile
    }
}
