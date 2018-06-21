import React, { Component } from "react";
import { connect } from "react-redux";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import PropTypes from "prop-types";
import Avatar from 'material-ui/Avatar'
import {grey900} from 'material-ui/styles/colors'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class AppBarButton extends Component {
  static muiName = 'FlatButton';

  onPress = () => {
    this.props.onPress && this.props.onPress()
  }

  render() {
    return (
      <FlatButton onClick={this.onPress} label={this.props.label} style={{color:'white'}} />
    );
  }
}

// <FlatButton onClick={()=> this.props.history.push('/admin')} label={'Предметы'} style={{color:'white'}}/>
// <FlatButton onClick={()=> this.props.history.push('/admin/students')} label={'Ученики'} style={{color:'white'}}/>
// <FlatButton onClick={()=> this.props.history.push('/admin/distribution/create')} label={'Создать рассылку'} style={{color:'white'}}/>

class HeaderAppBarAdmin extends Component {

  menuIcon = () => {
    return (
      <IconButton onClick={this.props.onMenuPressed} iconStyle={{color:'white', fill:'white'}}>
        <NavigationMenu style={{color:'white', fill:'white'}}/>
      </IconButton>
    )
  }

  render() {
    const rightComponent = this.props.isLogged ? <AppBarButton label={this.props.profile.username}/>
                                               : <AppBarButton label={'Войти'} onPress={()=> this.props.history.push('/admin/login')} />
    const {isDesktop} = this.props
    return (
      <Toolbar style={{backgroundColor:grey900}}>
         <ToolbarGroup firstChild={true}>
            {!isDesktop && this.menuIcon()}
         </ToolbarGroup>
         <ToolbarGroup lastChild>
            {rightComponent}
         </ToolbarGroup>
       </Toolbar>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth_admin.authenticated,
  profile: state.account_admin.profileData
});

HeaderAppBarAdmin.defaultProps = {
  onMenuPressed: () => {}
}

export default connect(mapStateToProps)(HeaderAppBarAdmin);
