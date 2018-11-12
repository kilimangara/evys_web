import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import setUpStore from './store'
import { Route, Switch } from 'react-router'
import App from './components/App'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import './screencss/Global.scss'
import { pick } from 'lodash'
import { createTheming } from 'react-jss'
import JssProvider from 'react-jss/lib/JssProvider'
import routes from './routes'
import 'moment/locale/ru'
import moment from 'moment'
import { jssPreset, createGenerateClassName } from '@material-ui/core/styles'
import { create } from 'jss'
import {theme} from "./utils/global_theme";
import Login from "./screens/Login";

const styleNode = document.createComment('insertion-point-jss')
document.head.insertBefore(styleNode, document.head.firstChild)

const generateClassName = createGenerateClassName()
const jss = create(jssPreset())
jss.options.insertionPoint = 'insertion-point-jss'

class Root extends Component {
    componentWillMount = () => {
        moment.locale('ru')
        const store = setUpStore()
        this.setState({ store })
        store.subscribe(this.handleDispatch)
    }

    handleDispatch = () => {
        let state = this.state.store.getState()
        state = pick(state, ['auth'])
        localStorage.setItem('evysMainAppState', JSON.stringify(state))
    }

    render() {
        if (!this.state.store) return null
        return (
            <Provider store={this.state.store}>
                <MuiThemeProvider>
                    <JssProvider jss={jss} generateClassName={generateClassName}>
                        <BrowserRouter>
                            <Switch>
                                <Route path="/app" component={App} />
                                <Route path="/login" component={Login} />
                            </Switch>
                        </BrowserRouter>
                    </JssProvider>
                </MuiThemeProvider>
            </Provider>
        )
    }
}

export default Root
