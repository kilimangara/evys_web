import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store, persistor } from './store'
import { Route, Switch } from 'react-router'
import App from './components/App'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import './screencss/Global.scss'
import { pick } from 'lodash'
import { createTheming } from 'react-jss'
import JssProvider from 'react-jss/lib/JssProvider'
import routes from './routes'
import { jssPreset, createGenerateClassName } from '@material-ui/core/styles'
import { create } from 'jss'
import { theme } from './utils/global_theme'
import Login from './screens/Login'
import { PersistGate } from 'redux-persist/integration/react'
import NotFoundPage from './screens/NotFoundPage'

const styleNode = document.createComment('insertion-point-jss')
document.head.insertBefore(styleNode, document.head.firstChild)

const generateClassName = createGenerateClassName()
const jss = create(jssPreset())
jss.options.insertionPoint = 'insertion-point-jss'

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MuiThemeProvider>
                        <JssProvider jss={jss} generateClassName={generateClassName}>
                            <BrowserRouter>
                                <Switch>
                                    <Route path="/app" component={App} />
                                    <Route path="/login" component={Login} />
                                    <Route component={NotFoundPage} />
                                </Switch>
                            </BrowserRouter>
                        </JssProvider>
                    </MuiThemeProvider>
                </PersistGate>
            </Provider>
        )
    }
}

export default Root
