import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Button, IconButton} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import HeaderPopover from './HeaderPopover'
import { AppToolbar, ToolbarGroup } from '../styled/layout'

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
            <IconButton onClick={this.props.onMenuPressed} iconStyle={{ color: 'white', fill: 'white' }}>
                <MenuIcon />
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
        const { isDesktop, isLogged, youtubeSigned, history, profile } = this.props
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
            <AppToolbar height={'64px'}>
                <ToolbarGroup>{!isDesktop && this.menuIcon()}</ToolbarGroup>
                <ToolbarGroup>
                    {youtubeComponent}
                    {rightComponent}
                </ToolbarGroup>
            </AppToolbar>
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
