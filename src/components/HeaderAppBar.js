import React, { Component } from "react";
import { connect } from "react-redux";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import PropTypes from "prop-types";
import Avatar from 'material-ui/Avatar'
import {blue500} from 'material-ui/styles/colors'


class Login extends Component {
  static muiName = 'FlatButton';

  onPress = () => {
    this.props.history.push('/app/login')
  }

  render() {
    return (
      <FlatButton onClick={this.onPress}  label="Войти" style={{color:'white'}} />
    );
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

class HeaderAppBar extends Component {

  handleMenuClick = () => {
    this.props.menuClick && this.props.menuClick()
  }

  render() {

    return (
      <AppBar
        onLeftIconButtonClick={this.handleMenuClick}
        title={'Evys'}
        style={{...this.props.style, backgroundColor: blue500}}
        iconElementRight={!this.props.isLogged ? <Login history={this.props.history} />
          : (<Avatar
          src="/static/images/placeholder_avatar.png"
          size={40}
          style={{margin:5}}/>)
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.authenticated,
  profile: state.account.profileData
});

export default connect(mapStateToProps)(HeaderAppBar);
