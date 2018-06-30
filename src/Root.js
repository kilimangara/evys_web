import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import setUpStore from "./store";
import { Route, Switch} from "react-router";
import App from "./components/App";
import AdminApp from './components/AdminApp'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import './screencss/Global.scss'

import routes from "./routes";

import 'moment/locale/ru'
import moment from 'moment'

class Root extends Component {

  componentWillMount = () => {
    moment.locale('ru')
    const store = setUpStore();
    this.setState({ store });
    store.subscribe(this.handleDispatch);
  };

  handleDispatch = () => {
    const state = this.state.store.getState();
    localStorage.setItem("evysMainAppState", JSON.stringify(state));
  };

  render() {
    console.log(this.state)
    if (!this.state.store) return null;
    return (
      <Provider store={this.state.store}>
        <MuiThemeProvider>
          <BrowserRouter>
            <Switch>
              <Route path='/app' component={App}/>
              <Route path='/admin' component={AdminApp}/>
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default Root;
