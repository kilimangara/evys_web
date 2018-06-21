import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import HeaderAppBarAdmin from './HeaderAppBarAdmin'
import { StickyContainer, Sticky } from 'react-sticky';
import LoginScreen from '../screens/admin/LoginScreen'
import SubjectsScreen from '../screens/admin/SubjectsScreen'
import ThemesScreen from '../screens/admin/ThemesScreen'
import TestCaseScreen from '../screens/admin/TestCaseScreen'
import StudentsScreen from '../screens/admin/StudentsScreen'
import DistributionScreen from '../screens/admin/DistributionScreen'
import HTMLBuilderScreen from '../screens/admin/HTMLBuilderScreen'
import ChooseAccountScreen from '../screens/admin/ChooseAccountScreen'
import TariffScreen from '../screens/admin/TariffScreen'
import {switchAdminApp} from '../actions/AppActions'
import {logoutAction} from '../actions/admin/AccountActions'
import {List, ListItem} from 'material-ui/List'
import Drawer from 'material-ui/Drawer'
import FontIcon from 'material-ui/FontIcon'
import {withGetScreen} from 'react-getscreen'
import {grey900} from 'material-ui/styles/colors'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import bind from 'memoize-bind'
import Divider from 'material-ui/Divider'
import RegisterScreen from '../screens/admin/RegisterScreen'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      opened: false
    }
  }

  componentWillMount(){
    this.props.switchAdminApp()
    if(!this.props.authenticated) this.props.history.push('/admin/login')
    else {
      if(!this.props.currentCompany) this.props.history.push('/admin/choose_account')
    }
  }

  goToExactPath = (path) => {
    this.handleMenuClick()
    this.props.history.push(path)
  }

  handleMenuClick = () => {
    this.setState({opened: !this.state.opened})
  }

  logout = () => {
    this.props.logoutAction()
    this.props.history.push('/admin/login')
  }

  render(){
    const {authenticated, isTablet, isMobile, company={}, currentCompany} = this.props
    const isDesktop = !isTablet() && !isMobile()
    const opened = isDesktop ? true : this.state.opened
    return (
        <div>
          <Drawer open={opened} width={200} docked={isDesktop} onRequestChange={(opened) => this.setState({opened})}>
            <Toolbar style={{backgroundColor:grey900}}>
               <ToolbarGroup firstChild style={{marginLeft: 12}}>
                  <ToolbarTitle text={company.name || 'Evys'} style={{color:'white'}}/>
               </ToolbarGroup>
             </Toolbar>
            <List>
              <ListItem primaryText={'Курсы'} onClick={bind(this.goToExactPath, this, '/admin')}
                        leftIcon={<FontIcon className='fab fa-leanpub'/>}/>
              <ListItem primaryText={'Ученики'} onClick={bind(this.goToExactPath, this, '/admin/students')}
                        leftIcon={<FontIcon className="fas fa-users"/>}/>
              <ListItem leftIcon={<FontIcon className="fas fa-tag"/>} primaryText={'Мои предложения'}
                        onClick={bind(this.goToExactPath, this, '/admin/tariffs')}/>
              <Divider/>
              <ListItem leftIcon={<FontIcon className="far fa-address-book"/>} primaryText={'Выбрать аккаунт'}
                        onClick={bind(this.goToExactPath, this, '/admin/choose_account')}/>
              <ListItem leftIcon={<FontIcon className="fas fa-sign-out-alt"/>} primaryText={'Выйти'}
                        onClick={bind(this.logout, this)}/>
            </List>
          </Drawer>
          <div style={{display:'flex', flexDirection:'column', marginLeft: isDesktop ? '200px' : '0px'}}>
            <HeaderAppBarAdmin history={this.props.history} isDesktop={isDesktop}
                               onMenuPressed={this.handleMenuClick}/>
            <Switch>
              <Route exact path='/admin' component={SubjectsScreen} />
              <Route path='/admin/login' component={LoginScreen}/>
              <Route exact path="/admin/subjects/:id(\d+)" component={ThemesScreen} />
              <Route exact path="/admin/themes/:theme_id(\d+)" component={TestCaseScreen} />
              <Route path='/admin/students' component={StudentsScreen}/>
              <Route path='/admin/editor' component={HTMLBuilderScreen}/>
              <Route path='/admin/choose_account' component={ChooseAccountScreen}/>
              <Route path='/admin/tariffs' component={TariffScreen}/>
              <Route path='/admin/register' component={RegisterScreen}/>
            </Switch>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account_admin.profileData || {},
  authenticated: state.auth_admin.authenticated,
  currentCompany: state.company_admin.currentCompany,
  company: state.company_admin.companyList.find(el => el.permalink === state.company_admin.currentCompany)
})

export default connect(mapStateToProps, {switchAdminApp, logoutAction})(withGetScreen(App))
