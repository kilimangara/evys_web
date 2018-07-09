import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import HeaderAppBar from './HeaderAppBar'
import { StickyContainer, Sticky } from 'react-sticky';
import Login from '../screens/Login'
import VideHost from '../screens/VideoHost'
import ProfileScreen from '../screens/ProfileScreen'
import Drawer from 'material-ui/Drawer'
import FontIcon from 'material-ui/FontIcon'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import RaisedButton from "material-ui/RaisedButton"
import TariffsScreen from '../screens/TariffsScreen'
import DashboardScreen from '../screens/DashboardScreen'
import ThemesScreen from '../screens/ThemesScreen'
import CoursesScreen from '../screens/CoursesScreen'
import ThemeStudyScreen from '../screens/ThemeStudyScreen'
import { exitProfile } from '../actions/AccountActions'
import { blue500 } from 'material-ui/styles/colors'
import { switchUserApp } from '../actions/AppActions'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  componentWillMount() {
    this.props.switchUserApp()
    if (this.props.authenticated) return
    this.props.history.push('/app/login')
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  renderHeader = (authenticated) => {
    const { full_name, phone } = this.props.account
    if (authenticated) {
      return (
        <div style={{ backgroundColor: blue500, flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: 16 }}>
          <Avatar
            src="/static/images/placeholder_avatar.png"
            size={48} />
          <div style={{ height: 5 }} />
          <span style={{ fontSize: 18, color: 'white' }}>{full_name}</span>
          <div style={{ height: 5 }} />
          <span style={{ fontSize: 14, color: 'white' }}>{phone}</span>
        </div>
      )
    }
    else {
      return (
        <div style={{ backgroundColor: blue500, flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <RaisedButton onClick={this.linkToLogin} primary label={'Войти'} />
        </div>
      )
    }
  }

  goToProfile = () => {
    this.handleClose()
    this.props.history.push('/app/profile')
  }

  goToTariffs = () => {
    this.handleClose()
    this.props.history.push('/app/tariffs')
  }

  goToCourses = () => {
    this.handleClose()
    this.props.history.push('/app/courses')
  }

  goToDashboard = () => {
    this.handleClose()
    this.props.history.push('/app')
  }

  linkToLogin = () => {
    this.handleClose()
    this.props.history.push('/app/login')
  }

  exitProfile = () => {
    this.props.exitProfile()
    this.handleClose()
    this.props.history.push('/app/login')
  }

  render() {
    const { authenticated } = this.props

    return (
      <StickyContainer style={{ display: 'flex', flexDirection: 'column' }}>
        <Sticky>
          {
            ({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }) => {

              return <HeaderAppBar menuClick={this.handleToggle}
                history={this.props.history} style={style} />
            }
          }
        </Sticky>
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          {this.renderHeader(authenticated)}
          {authenticated &&
            (<List>
              <ListItem primaryText={'Мои показатели'} leftIcon={<FontIcon className='fas fa-chart-bar' />}
                onClick={this.goToDashboard} />
              <ListItem primaryText={'Мои курсы'} leftIcon={<FontIcon className="fas fa-graduation-cap" />}
                onClick={this.goToCourses} />
              <ListItem primaryText={'Наши предложения'} leftIcon={<FontIcon className="fas fa-th-list" />}
                onClick={this.goToTariffs} />
              <Divider />
              <ListItem primaryText={'Профиль'} leftIcon={<FontIcon className="fas fa-user" />}
                onClick={this.goToProfile} />
              <ListItem primaryText={'Выход'} leftIcon={<FontIcon className="fas fa-sign-out-alt" />}
                onClick={this.exitProfile} />
            </List>)
          }
        </Drawer>
        <div style={{ flex: 1 }}>
          <Route exact path='/app' component={DashboardScreen} />
          <Route path='/app/login' component={Login} />
          <Route path='/app/courses' component={CoursesScreen} />
          <Route exact path='/app/course/:course_id(\d+)/themes' component={ThemesScreen} />
          <Route path='/app/theme_study' component={ThemeStudyScreen} />
          <Route path='/app/profile' component={ProfileScreen} />
          <Route path='/app/tariffs' component={TariffsScreen} />
        </div>
      </StickyContainer>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account.profileData || {},
  authenticated: state.auth.authenticated,
})

export default connect(mapStateToProps, { exitProfile, switchUserApp })(App);
