import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import setUpStore from './store'
import { Route, Switch } from 'react-router'
import AdminApp from './components/AdminApp'
import LoginScreen from './screens/admin/LoginScreen'
import RegisterScreen from './screens/admin/RegisterScreen'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './screencss/Global.scss'
import { ADMIN_APP } from './modules/apps'
import { pick } from 'lodash'
import routes from './routes'
import 'moment/locale/ru'
import moment from 'moment'
import JssProvider from 'react-jss/lib/JssProvider'
import { createGenerateClassName, jssPreset } from '@material-ui/core'
import { create } from 'jss'
import { theme } from './utils/global_theme'

const styleNode = document.createComment('insertion-point-jss')
document.head.insertBefore(styleNode, document.head.firstChild)

const generateClassName = createGenerateClassName()
const jss = create(jssPreset())
jss.options.insertionPoint = 'insertion-point-jss'

class Root extends Component {
    componentWillMount = () => {
        moment.locale('ru')
        const store = setUpStore(ADMIN_APP)
        this.setState({ store })
        store.subscribe(this.handleDispatch)
    }

    handleDispatch = () => {
        let state = this.state.store.getState()
        state = pick(state, ['account_admin', 'auth_admin', 'company_admin'])
        localStorage.setItem('evysAdminMainAppState', JSON.stringify(state))
    }

    render() {
        if (!this.state.store) return null
        return (
            <Provider store={this.state.store}>
                <MuiThemeProvider theme={theme}>
                    <JssProvider jss={jss} generateClassName={generateClassName}>
                        <BrowserRouter>
                            <Switch>
                                <Route exact path="/admin/register" component={RegisterScreen} />
                                <Route exact path="/admin/login" component={LoginScreen} />
                                <Route path="/admin" component={AdminApp} />
                            </Switch>
                        </BrowserRouter>
                    </JssProvider>
                </MuiThemeProvider>
            </Provider>
        )
    }
}

export default Root
