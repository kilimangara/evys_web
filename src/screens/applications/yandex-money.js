import React from 'react'
import withProviders from '../../utils/withProviders'
import { compose } from 'recompose'
import { loadAccount, saveAccount, saveToken } from '../../reducers/admin/application'
import styled from 'styled-components'
import { Route, Switch, Redirect } from 'react-router'
import SaveButton from '../../components/common/SaveButton'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import { ColoredContainer } from '../../components/styled/common'
import { AuthCard, AuthCardContent, AuthField } from '../../components/styled/authorization'
import { theme } from '../../utils/global_theme'
import produce from 'immer'
import AppLoginComponent from './login'

class YandexMoneyContainer extends React.Component {
    state = {
        account: null
    }

    componentDidUpdate(prevProps) {
        if (this.props.account !== prevProps.account) {
            this.setState({ account: this.props.account })
        }
    }

    handleChange = field => event => {
        const value = event.target.value
        this.setState(
            produce(draft => {
                draft.account[field] = value
            })
        )
    }

    saveAccount = () => {
        this.props.saveAccount(this.state.account).then(() => {
            this.saveButton.success()
        })
    }

    renderAccountContainer = () => {
        const { account } = this.state
        return (
            <ColoredContainer backgroundColor={theme.BACKGROUND_DARK}>
                {!account && <CircularProgress color="primary" />}
                {!!account && (
                    <AuthCard>
                        <AuthCardContent>
                            <TextField
                                name="wallet"
                                label="Номер кошелька Я.Д"
                                value={account.walletId || ''}
                                fullWidth
                                margin={'normal'}
                                onChange={this.handleChange('walletId')}
                                variant="outlined"
                            />
                            <SaveButton ref={ref => (this.saveButton = ref)} onClick={this.saveAccount} />
                        </AuthCardContent>
                    </AuthCard>
                )}
            </ColoredContainer>
        )
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/application/yandex_money/settings" render={this.renderAccountContainer} />
                <Route
                    exact
                    path="/application/yandex_money/login"
                    render={() => (
                        <AppLoginComponent
                            to={'/application/yandex_money/settings'}
                            preAuthRequest={this.props.loadAccount}
                        />
                    )}
                />
            </React.Fragment>
        )
    }
}

class YandexProvider {
    static mapStateToProps = state => ({
        account: state.application.account
    })

    static mapDispatchToProps = {
        loadAccount,
        saveAccount
    }
}

export default withProviders(YandexProvider)(YandexMoneyContainer)
