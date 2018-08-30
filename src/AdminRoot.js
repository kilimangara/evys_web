import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import setUpStore from "./store";
import { Route, Switch} from "react-router";
import AdminApp from './components/AdminApp'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import './screencss/Global.scss'
import {ADMIN_APP} from './modules/apps'
import {pick} from 'lodash'

import routes from "./routes";

import 'moment/locale/ru'
import moment from 'moment'

class Root extends Component {

  componentWillMount = () => {
    moment.locale('ru')
    const store = setUpStore(ADMIN_APP);
    this.setState({ store });
    store.subscribe(this.handleDispatch);
  };

  handleDispatch = () => {
    let state = this.state.store.getState();
    state = pick(state, ['account_admin', 'auth_admin', 'company_admin'])
    localStorage.setItem("evysAdminMainAppState", JSON.stringify(state))
  };

  render() {
    if (!this.state.store) return null;
    return (
      <Provider store={this.state.store}>
        <MuiThemeProvider>
          <BrowserRouter>
            <Switch>
              <Route path='/admin' component={AdminApp}/>
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default Root;
