import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { persistor, store } from './store'
import { Route, Switch } from 'react-router'
import AdminApp from './components/AdminApp'
import LoginScreen from './screens/admin/LoginScreen'
import RegisterScreen from './screens/admin/RegisterScreen'
import routes from './routes'
import JssProvider from 'react-jss/lib/JssProvider'
import { createGenerateClassName, jssPreset } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { create } from 'jss'
import { theme } from './utils/global_theme'
import { PersistGate } from 'redux-persist/integration/react'
import lightBlue from '@material-ui/core/colors/lightBlue'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import DateFnsUtils from '@date-io/date-fns'

import './screencss/PaginateCss.scss'
import './screencss/Global.scss'

const styleNode = document.createComment('insertion-point-jss')
document.head.insertBefore(styleNode, document.head.firstChild)

const generateClassName = createGenerateClassName()
const jss = create(jssPreset())
jss.options.insertionPoint = 'insertion-point-jss'

const muitheme = createMuiTheme({
    palette: {
        primary: lightBlue
    },
    overrides: {
        MuiButton: {
            raisedPrimary: {
                color: 'white'
            }
        }
    },
    typography: { useNextVariants: true }
})

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MuiThemeProvider theme={muitheme}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <JssProvider jss={jss} generateClassName={generateClassName}>
                                <BrowserRouter>
                                    <Switch>
                                        <Route exact path="/admin/register" component={RegisterScreen} />
                                        <Route exact path="/admin/login" component={LoginScreen} />
                                        <Route path="/admin" component={AdminApp} />
                                    </Switch>
                                </BrowserRouter>
                            </JssProvider>
                        </MuiPickersUtilsProvider>
                    </MuiThemeProvider>
                </PersistGate>
            </Provider>
        )
    }
}

export default Root
