import React from 'react'
import { connect } from 'react-redux'
import AccountBlocked from '../../components/accounts/AccountBlocked'

export default (WrappedComponent, replaceComponent = true) => {
    class AccountBlockedHOC extends React.Component {
        //Здесь методы для работы с данными из компонента

        render() {
            const { blocked, ...otherProps } = this.props
            if (blocked && replaceComponent) return <AccountBlocked />
            if (blocked && !replaceComponent) return null
            return <WrappedComponent {...otherProps} />
        }
    }

    const mapStateToProps = state => ({
        blocked: state.account.currentAccountBlocked
    })

    return connect(mapStateToProps)(AccountBlockedHOC)
}
