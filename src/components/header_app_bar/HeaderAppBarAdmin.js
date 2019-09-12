import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Button, IconButton } from '@material-ui/core'
import HeaderPopover from './HeaderPopover'
import { AppToolbar, ColoredMenuIcon, ToolbarGroup } from '../styled/layout'
import Icon from '@material-ui/core/Icon'
import { theme } from '../../utils/global_theme'
import { ColoredIconButton } from '../styled/common'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { matchPath } from 'react-router'
import { resetHeader } from '../../reducers/admin/navigation'

export const Group = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`
export const GroupItem = styled.div`
    margin-left: ${({ margin = 0 }) => `${margin}px`};
    display: flex;
    align-items: center;
`

export const HeaderText = styled(Typography)`
    color: ${theme.CONTRAST_LIGHT};
    font-size: 18px;
    font-weight: 500;
`

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

class HeaderAppBarAdmin extends Component {
    menuIcon = () => {
        return (
            <div style={{ marginLeft: 12, marginRight: 12 }}>
                <ColoredIconButton
                    color={theme.CONTRAST_LIGHT}
                    rippleColor={theme.CONTRAST_RIPPLE}
                    onClick={this.props.onMenuPressed}
                >
                    <Icon>menu</Icon>
                </ColoredIconButton>
            </div>
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.props.resetHeader()
        }
    }

    loginYoutube() {
        window.GoogleAuth.signIn()
    }

    logoutYoutube() {
        window.GoogleAuth.signOut()
    }

    hasBackButton = () => {
        const { navigation } = this.props
        return navigation.backUrl
    }

    navigationClickWrapper = () => {
        const { backUrl } = this.props.navigation
        this.props.history.replace(backUrl)
    }

    headerText = () => {
        const { header } = this.props.navigation
        return header
    }

    render() {
        const { isLogged, youtubeSigned, history, profile, className, open } = this.props
        const rightComponent = isLogged ? (
            <AppBarButton history={history} label={profile.email} accountId={profile.id} />
        ) : (
            <AppBarButton register label={'Войти'} onPress={() => history.push('/admin/login')} />
        )
        const youtubeComponent = youtubeSigned ? (
            <AppBarButton register label={'Youtube подключен'} onPress={this.logoutYoutube} />
        ) : (
            <AppBarButton register label={'Войти в Youtube'} onPress={this.loginYoutube} />
        )

        return (
            <AppBar postion="sticky" className={className}>
                <AppToolbar height={'64px'} disableGutters>
                    <ToolbarGroup>
                        <Group>
                            {!open && this.menuIcon()}
                            <GroupItem margin={6}>
                                {this.hasBackButton() && (
                                    <ColoredIconButton
                                        color={theme.CONTRAST_LIGHT}
                                        rippleColor={theme.CONTRAST_RIPPLE}
                                        onClick={this.navigationClickWrapper}
                                    >
                                        <Icon>arrow_back</Icon>
                                    </ColoredIconButton>
                                )}
                                {this.headerText() && <HeaderText component={'span'}>{this.headerText()}</HeaderText>}
                            </GroupItem>
                        </Group>
                    </ToolbarGroup>
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
    isLogged: Boolean(state.authorization.token) || state.authorization.type == 'session',
    profile: state.profile.profileData,
    youtubeSigned: state.youtube.signedIn,
    navigation: state.navigation
})

HeaderAppBarAdmin.defaultProps = {
    onMenuPressed: () => {}
}

export default connect(
    mapStateToProps,
    { resetHeader }
)(HeaderAppBarAdmin)
