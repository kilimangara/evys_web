import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import { grey900 } from 'material-ui/styles/colors'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import Button from '@material-ui/core/Button'
import HeaderPopover from './HeaderPopover'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

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
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    style={{ color: 'white' }}
                    onClick={this.handleClick}
                >
                    {label}
                </Button>
                <HeaderPopover history={history} open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={this.handleClose} />
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
            <IconButton onClick={this.props.onMenuPressed} iconStyle={{ color: 'white', fill: 'white' }}>
                <NavigationMenu style={{ color: 'white', fill: 'white' }} />
            </IconButton>
        )
    }

    loginYoutube() {
        window.GoogleAuth.signIn()
    }

    logoutYoutube() {
        window.GoogleAuth.signOut()
    }

    render() {
        const rightComponent = this.props.isLogged ? (
            <AppBarButton history={this.props.history} label={this.props.profile.username} accountId={this.props.profile.id} acco />
        ) : (
            <AppBarButton register label={'Войти'} onPress={() => this.props.history.push('/admin/login')} />
        )
        const youtubeComponent = this.props.youtubeSigned ? (
            <AppBarButton register label={'Youtube подключен'} onPress={this.logoutYoutube} />
        ) : (
            <AppBarButton register label={'Войти в Youtube'} onPress={this.loginYoutube} />
        )
        const { isDesktop } = this.props
        return (
            <Toolbar style={{ backgroundColor: grey900 }}>
                <ToolbarGroup firstChild={true}>{!isDesktop && this.menuIcon()}</ToolbarGroup>
                <ToolbarGroup lastChild>
                    {youtubeComponent}
                    {rightComponent}
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

const mapStateToProps = state => ({
    isLogged: state.auth_admin.authenticated,
    profile: state.account_admin.profileData,
    youtubeSigned: state.youtube.signedIn
})

HeaderAppBarAdmin.defaultProps = {
    onMenuPressed: () => {}
}

export default connect(mapStateToProps)(HeaderAppBarAdmin)
