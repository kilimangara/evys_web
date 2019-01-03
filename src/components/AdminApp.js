import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import HeaderAppBarAdmin from './header_app_bar/HeaderAppBarAdmin'
import SubjectsScreen from '../screens/admin/SubjectsScreen'
import ThemesScreen from '../screens/admin/ThemesScreen'
import TestCaseScreen from '../screens/admin/TestCaseScreen'
import StudentsScreen from '../screens/admin/StudentsScreen'
import ChooseAccountScreen from '../screens/admin/ChooseAccountScreen'
import TariffScreen from '../screens/admin/TariffScreen'
import { switchAdminApp } from '../actions/AppActions'
import { logoutAction } from '../actions/admin/AccountActions'
import { pickAsset } from '../actions/admin/TemplateAssetsActions'
import { Hidden, Icon, List, ListItem, ListItemIcon, ListItemText, withWidth, Divider } from '@material-ui/core'
import { withGetScreen } from 'react-getscreen'
import bind from 'memoize-bind'
import Modal from 'reboron/ScaleModal'
import ImageAssetPicker from './template_assets/ImageAssetPicker'
import pt from 'prop-types'
import GoogleAuth from './youtube/GoogleAuth'
import AddVideoScreen from '../screens/admin/AddVideoScreen'
import VideoScreen from '../screens/admin/VideoScreen'
import { AppContainer, AppDrawer, AppToolbar, CompanyBlock, ListIcon } from './styled/layout'
import { CommonWrapper } from './styled/common'
import { theme } from '../utils/global_theme'

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
        if (this.state.opened && this.props.width === 'xs') {
            this.handleMenuClick()
        }
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

    drawerContent = () => {
        const { company = {} } = this.props
        return (
            <div>
                <AppToolbar>
                    <CompanyBlock>{company.name || 'Evys'}</CompanyBlock>
                </AppToolbar>
                <List>
                    <ListItem button onClick={bind(this.goToExactPath, this, '/admin')}>
                        <ListItemIcon>
                            <ListIcon className={'fab fa-leanpub'} />
                        </ListItemIcon>
                        <ListItemText primary={'Курсы'} />
                    </ListItem>
                    <ListItem button onClick={bind(this.goToExactPath, this, '/admin/students')}>
                        <ListItemIcon>
                            <ListIcon className="fas fa-users" />
                        </ListItemIcon>
                        <ListItemText primary={'Ученики'} />
                    </ListItem>
                    <ListItem button onClick={bind(this.goToExactPath, this, '/admin/tariffs')}>
                        <ListItemIcon>
                            <ListIcon className="fas fa-tag" />
                        </ListItemIcon>
                        <ListItemText primary={'Мои предложения'} />
                    </ListItem>
                    <Divider />
                </List>
            </div>
        )
    }

    render() {
        const { authenticated, isTablet, isMobile, company = {}, currentCompany } = this.props
        const isDesktop = !isTablet() && !isMobile()
        return (
            <div style={styles.root}>
                <GoogleAuth />
                <Hidden smUp implementation={'css'}>
                    <AppDrawer open={this.state.opened} onClose={this.handleMenuClick} variant={'temporary'}>
                        {this.drawerContent()}
                    </AppDrawer>
                </Hidden>
                <Hidden xsDown implementation={'css'}>
                    <AppDrawer
                        PaperProps={{ style: { zIndex: 2 } }}
                        ModalProps={{ style: { zIndex: 2 } }}
                        open
                        variant={'permanent'}
                    >
                        {this.drawerContent()}
                    </AppDrawer>
                </Hidden>
                <AppContainer isDesktop={this.props.width !== 'xs'}>
                    <HeaderAppBarAdmin
                        history={this.props.history}
                        isDesktop={isDesktop}
                        onMenuPressed={this.handleMenuClick}
                        position={'sticky'}
                    />
                    <Modal
                        ref={ref => (this.assetManager = ref)}
                        modalStyle={{ height: '100vh', overflowY: 'auto' }}
                        onHide={this.imageAssetPickerClose}
                    >
                        <ImageAssetPicker assetPicked={this.onAssetPicked} />
                    </Modal>
                    <CommonWrapper>
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
                    </CommonWrapper>
                </AppContainer>
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
)(withWidth()(withGetScreen(App)))
