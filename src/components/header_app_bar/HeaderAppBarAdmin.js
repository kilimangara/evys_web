import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, IconButton } from '@material-ui/core'
import HeaderPopover from './HeaderPopover'
import { AppToolbar, ColoredMenuIcon, ToolbarGroup } from '../styled/layout'
import MenuIcon from '@material-ui/icons/Menu'
import { theme } from '../../utils/global_theme'
import { ColoredIconButton } from '../styled/common'
import AppBar from '@material-ui/core/AppBar';

class AppBarButton extends Component {
    state = {
        anchorEl: null
    }

    handleClick = event => {
        if (this.props.register) return this.onPress()
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    onPress = () => {
        this.props.onPress && this.props.onPress()
    }

    render() {
        const { anchorEl } = this.state
        const { label, accountId, history } = this.props
        return (
            <div>
                <Button
                    aria-owns={anchorEl ? 'popover-info' : null}
                    aria-haspopup="true"
                    style={{ color: 'white' }}
                    onClick={this.handleClick}
                >
                    {label}
                </Button>
                <HeaderPopover
                    history={history}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                />
            </div>
        )
    }
}

// <FlatButton onClick={()=> this.props.history.push('/admin')} label={'Предметы'} style={{color:'white'}}/>
// <FlatButton onClick={()=> this.props.history.push('/admin/students')} label={'Ученики'} style={{color:'white'}}/>
// <FlatButton onClick={()=> this.props.history.push('/admin/distribution/create')} label={'Создать рассылку'} style={{color:'white'}}/>

class HeaderAppBarAdmin extends Component {
    menuIcon = () => {
        return (
          <div style={{ marginLeft: 12, marginRight: 36}}>
            <ColoredIconButton
                color={theme.CONTRAST_LIGHT}
                rippleColor={theme.SECONDARY}
                onClick={this.props.onMenuPressed}
            >
                <MenuIcon />
            </ColoredIconButton>
          </div>
        )
    }

    loginYoutube() {
        window.GoogleAuth.signIn()
    }

    logoutYoutube() {
        window.GoogleAuth.signOut()
    }

    render() {
        const { isLogged, youtubeSigned, history, profile, className, open } = this.props
        const rightComponent = isLogged ? (
            <AppBarButton history={history} label={profile.username} accountId={profile.id} acco />
        ) : (
            <AppBarButton register label={'Войти'} onPress={() => history.push('/admin/login')} />
        )
        const youtubeComponent = youtubeSigned ? (
            <AppBarButton register label={'Youtube подключен'} onPress={this.logoutYoutube} />
        ) : (
            <AppBarButton register label={'Войти в Youtube'} onPress={this.loginYoutube} />
        )

        return (
            <AppBar postion='sticky' className={className}>
              <AppToolbar height={'64px'} disableGutters={!open}>
                  <ToolbarGroup>{!open && this.menuIcon()}</ToolbarGroup>
                  <ToolbarGroup>
                      {youtubeComponent}
                      {rightComponent}
                  </ToolbarGroup>
              </AppToolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = state => ({
    isLogged: Boolean(state.authorization.token),
    profile: state.profile.profileData,
    youtubeSigned: state.youtube.signedIn
})

HeaderAppBarAdmin.defaultProps = {
    onMenuPressed: () => {}
}

export default connect(mapStateToProps)(HeaderAppBarAdmin)
