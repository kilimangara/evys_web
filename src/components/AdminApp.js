import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import HeaderAppBarAdmin from './header_app_bar/HeaderAppBarAdmin'
import SubjectsScreen from '../screens/admin/SubjectsScreen'
import ThemesScreen from '../screens/admin/ThemesScreen'
import TestCaseScreen from '../screens/admin/TestCaseScreen'
import StudentsScreen from '../screens/admin/StudentsScreen'
import DistributionScreen from '../screens/admin/DistributionScreen'
// import HTMLBuilderScreen from '../screens/admin/HTMLBuilderScreen'
import ChooseAccountScreen from '../screens/admin/ChooseAccountScreen'
import TariffScreen from '../screens/admin/TariffScreen'
import { switchAdminApp } from '../actions/AppActions'
import { logoutAction } from '../actions/admin/AccountActions'
import { pickAsset } from '../actions/admin/TemplateAssetsActions'
import { List, ListItem } from 'material-ui/List'
import Drawer from 'material-ui/Drawer'
import FontIcon from 'material-ui/FontIcon'
import { withGetScreen } from 'react-getscreen'
import { grey900 } from 'material-ui/styles/colors'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import bind from 'memoize-bind'
import Divider from 'material-ui/Divider'
import Modal from 'reboron/ScaleModal'
import ImageAssetPicker from './template_assets/ImageAssetPicker'
import pt from 'prop-types'
import GoogleAuth from './youtube/GoogleAuth'
import AddVideoScreen from '../screens/admin/AddVideoScreen'
import VideoScreen from '../screens/admin/VideoScreen'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            opened: false
        }
    }

    onAssetPicked = (assetObject, meta) => {
        this.assetManager.hide()
        this.props.pickAsset(assetObject, meta)
    }

    componentWillMount() {
        this.props.switchAdminApp()
        if (!this.props.authenticated) this.props.history.push('/admin/login')
        else {
            if (!this.props.currentCompany) this.props.history.push('/admin/choose_account')
        }
    }

    goToExactPath = path => {
        this.handleMenuClick()
        this.props.history.push(path)
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.assetOpened && this.props.assetOpened) this.assetManager.show()
        if (prevProps.assetOpened && !this.props.assetOpened) this.assetManager.hide()
    }

    handleMenuClick = () => {
        this.setState({ opened: !this.state.opened })
    }

    logout = () => {
        this.props.logoutAction()
        this.props.history.push('/admin/login')
    }

    imageAssetPickerClose = source => {
        console.log(source)
    }

    render() {
        const { authenticated, isTablet, isMobile, company = {}, currentCompany } = this.props
        const isDesktop = !isTablet() && !isMobile()
        const opened = isDesktop ? true : this.state.opened
        return (
            <div style={styles.root}>
                <GoogleAuth />
                <Drawer
                    containerStyle={{ zIndex: 1000 }}
                    open={opened}
                    width={200}
                    docked={isDesktop}
                    onRequestChange={opened => this.setState({ opened })}
                >
                    <Toolbar style={{ backgroundColor: grey900 }}>
                        <ToolbarGroup firstChild style={{ marginLeft: 12 }}>
                            <ToolbarTitle text={company.name || 'Evys'} style={{ color: 'white' }} />
                        </ToolbarGroup>
                    </Toolbar>
                    <List>
                        <ListItem
                            primaryText={'Курсы'}
                            onClick={bind(this.goToExactPath, this, '/admin')}
                            leftIcon={<FontIcon className="fab fa-leanpub" />}
                        />
                        <ListItem
                            primaryText={'Ученики'}
                            onClick={bind(this.goToExactPath, this, '/admin/students')}
                            leftIcon={<FontIcon className="fas fa-users" />}
                        />
                        <ListItem
                            leftIcon={<FontIcon className="fas fa-tag" />}
                            primaryText={'Мои предложения'}
                            onClick={bind(this.goToExactPath, this, '/admin/tariffs')}
                        />
                        <Divider />
                    </List>
                </Drawer>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: isDesktop ? '200px' : '0px',
                        width: isDesktop ? 'calc(100% - 200px)' : '100%',
                        height: '100%'
                    }}
                >
                    <HeaderAppBarAdmin
                        history={this.props.history}
                        isDesktop={isDesktop}
                        onMenuPressed={this.handleMenuClick}
                    />
                    <Modal
                        ref={ref => (this.assetManager = ref)}
                        modalStyle={{ height: '90vh', overflowY: 'auto' }}
                        onHide={this.imageAssetPickerClose}
                    >
                        <ImageAssetPicker assetPicked={this.onAssetPicked} />
                    </Modal>
                    <Switch>
                        <Route exact path="/admin" component={SubjectsScreen} />
                        <Route exact path="/admin/subjects/:id(\d+)" component={ThemesScreen} />
                        <Route exact path="/admin/themes/:theme_id(\d+)" component={TestCaseScreen} />
                        <Route path="/admin/students" component={StudentsScreen} />
                        <Route path="/admin/choose_account" component={ChooseAccountScreen} />
                        <Route path="/admin/tariffs" component={TariffScreen} />
                        <Route exact path="/admin/themes/:theme_id(\d+)/add_video" component={AddVideoScreen} />
                        <Route exact path="/admin/theory/:theory_id(\d+)/watch" component={VideoScreen} />
                    </Switch>
                </div>
            </div>
        )
    }
}

const styles = {
    root: {
        height: '100%'
    }
}

const mapStateToProps = state => ({
    account: state.account_admin.profileData || {},
    authenticated: state.auth_admin.authenticated,
    currentCompany: state.company_admin.currentCompany,
    company: state.company_admin.companyList.find(el => el.permalink === state.company_admin.currentCompany),
    assetOpened: state.asset_manager.managerOpened
})

export default connect(
    mapStateToProps,
    { switchAdminApp, logoutAction, pickAsset }
)(withGetScreen(App))
