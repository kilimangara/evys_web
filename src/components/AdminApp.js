import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import HeaderAppBarAdmin from './header_app_bar/HeaderAppBarAdmin'
import SubjectsScreen from '../screens/admin/SubjectsScreen'
import StudentsScreen from '../screens/admin/StudentsScreen'
import ChooseAccountScreen from '../screens/admin/ChooseAccountScreen'
import SettingsScreen from '../screens/admin/settings'
import { Hidden, Icon, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core'
import Modal from 'reboron/ScaleModal'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ImageAssetPicker from './template_assets/ImageAssetPicker'
import pt from 'prop-types'
import GoogleAuth from './youtube/GoogleAuth'
import AddVideoScreen from '../screens/admin/AddVideoScreen'
import VideoScreen from '../screens/admin/VideoScreen'
import { AppContainer, AppDrawer, AppToolbar, CompanyBlock, ListIcon } from './styled/layout'
import { CommonWrapper } from './styled/common'
import { theme } from '../utils/global_theme'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import SubjectScreen from '../screens/admin/subject'
import ThemeScreen from '../screens/admin/theme'
import { logoutAdmin } from '../reducers/admin/authorization'
import { switchManager, pickAsset } from '../reducers/admin/assetManager'
import { SnackbarProvider } from 'notistack'
import SettingsIcon from '@material-ui/icons/Settings'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push('/admin/login')
        else {
            if (!this.props.currentAccount) this.props.history.push('/admin/choose_account')
        }
    }

    goToExactPath = path => () => {
        this.props.history.push(path)
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.assetOpened && this.props.assetOpened) this.assetManager.show()
        if (prevProps.assetOpened && !this.props.assetOpened) this.assetManager.hide()
    }

    handleMenuClick = () => {
        this.setState({ open: !this.state.open })
    }

    logout = () => {
        this.props.logoutAdmin()
        this.props.history.push('/admin/login')
    }

    imageAssetPickerClose = source => {
        console.log(source)
    }

    drawerContent = () => {
        const { account } = this.props
        return (
            <div>
                <AppToolbar inverse>
                    <div style={{ flex: 1 }} />
                    <IconButton onClick={this.handleMenuClick}>
                        <ChevronLeftIcon />
                    </IconButton>
                </AppToolbar>
                <List>
                    <ListItem button onClick={this.goToExactPath('/admin/subjects')}>
                        <ListItemIcon>
                            <ListIcon className={'fab fa-leanpub'} />
                        </ListItemIcon>
                        <ListItemText primary={'Курсы'} />
                    </ListItem>
                    <ListItem button onClick={this.goToExactPath('/admin/students')}>
                        <ListItemIcon>
                            <ListIcon className="fas fa-users" />
                        </ListItemIcon>
                        <ListItemText primary={'Ученики'} />
                    </ListItem>
                    <ListItem button onClick={this.goToExactPath('/admin/settings')}>
                        <ListItemIcon>
                            <ListIcon>
                                <SettingsIcon />
                            </ListIcon>
                        </ListItemIcon>
                        <ListItemText primary={'Настройки'} />
                    </ListItem>
                    <Divider />
                </List>
            </div>
        )
    }

    render() {
        const { authenticated, account, currentAccount, classes } = this.props
        return (
            <div style={inlineStyles.root}>
                <GoogleAuth />
                <AppDrawer
                    PaperProps={{ style: { zIndex: 2 } }}
                    ModalProps={{ style: { zIndex: 2 } }}
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open
                        })
                    }}
                    open={this.state.open}
                    variant={'permanent'}
                >
                    {this.drawerContent()}
                </AppDrawer>
                <HeaderAppBarAdmin
                    history={this.props.history}
                    onMenuPressed={this.handleMenuClick}
                    open={this.state.open}
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open
                    })}
                />
                <AppContainer>
                    <Modal ref={ref => (this.assetManager = ref)} onHide={this.imageAssetPickerClose}>
                        <ImageAssetPicker />
                    </Modal>
                    <div style={{ minHeight: 64 }} />
                    <SnackbarProvider maxSnack={5}>
                        <CommonWrapper>
                            <Switch>
                                <Route
                                    exact
                                    path="/admin"
                                    render={() => {
                                        if (!this.props.authenticated) return null
                                        if (!this.props.currentAccount) return null
                                        return <Redirect to="/admin/subjects" />
                                    }}
                                />
                                <Route exact path="/admin/subjects" component={SubjectsScreen} />
                                <Route path="/admin/subjects/:subjectId(\d+)" component={SubjectScreen} />
                                <Route path="/admin/themes/:themeId(\d+)" component={ThemeScreen} />
                                <Route path="/admin/students" component={StudentsScreen} />
                                <Route path="/admin/choose_account" component={ChooseAccountScreen} />
                                <Route exact path="/admin/themes/:theme_id(\d+)/add_video" component={AddVideoScreen} />
                                <Route exact path="/admin/theory/:theory_id(\d+)/watch" component={VideoScreen} />
                                <Route path="/admin/settings" component={SettingsScreen} />
                            </Switch>
                        </CommonWrapper>
                    </SnackbarProvider>
                </AppContainer>
            </div>
        )
    }
}

const inlineStyles = {
    root: {
        height: '100%',
        display: 'flex',
        backgroundColor: '#F2F3F5'
    }
}

const drawerWidth = 240

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: 'hidden',
        width: 64,
        [theme.breakpoints.up('sm')]: {
            width: 64
        }
    }
})

const mapStateToProps = state => ({
    account: state.profile.profileData || {},
    authenticated: Boolean(state.authorization.token),
    currentAccount: state.account.currentAccount,
    account: state.account.accounts.find(el => el.permalink === state.account.currentAccount),
    assetOpened: state.assetManager.managerOpened
})

export default connect(
    mapStateToProps,
    { logoutAdmin, switchManager }
)(withStyles(styles)(App))
