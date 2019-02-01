import { loadAccounts, newAccount, chooseAccount } from '../../reducers/admin/account'

export default superclass =>
    class AccountsRepository extends superclass {
        //Здесь методы для работы с данными из компонента
    }

export class AccountsProvider {
    static mapStateToProps = state => ({
        accounts: state.account.accounts
    })

    static mapDispatchToProps = {
        loadAccounts,
        newAccount,
        chooseAccount
    }
}
