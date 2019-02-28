import React, { Component } from 'react'
import classNames from 'classnames'
import { LeftPanelContainer, LeftPanelNavigation, LeftPanelNavigationItem } from '../styled/layout'
import { BorderedImage, SizedIconButton, StudentTypography } from '../styled/common'
import IconButton from '@material-ui/core/IconButton/IconButton'
import { withRouter } from 'react-router'
import { AccountProvider } from '../../mixins/student/AccountRepository'
import withProviders from '../../utils/withProviders'
import { DEFAULT_AVATAR_IMAGE_URL } from '../../screens/ProfileScreen'
import { AuthorizationProvider } from '../../mixins/student/AuthorizationRepository'
import { SearchProvider } from '../../mixins/student/SearchRepository'

class LeftPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: null
        }
    }

    componentDidMount() {
        if (this.isAllCourses()) {
            this.setState({ selectedTab: 'all' })
        } else if (this.isMyCourses()) {
            this.setState({ selectedTab: 'my' })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { selectedTab } = this.state

        if (prevProps.location !== this.props.location) {
            if (this.isAllCourses() && selectedTab !== 'all') {
                this.setState({ selectedTab: 'all' })
            } else if (this.isMyCourses() && selectedTab !== 'my') {
                this.setState({ selectedTab: 'my' })
            }
        }
    }

    activeButton(index) {
        switch (index) {
            case 0:
                return { chart: true }
            case 1:
                return { graduation: true }
            case 2:
                return { accounts: true }
            case 3:
                return { user: true }
            default:
                return { graduation: true }
        }
    }

    goToNotifications = () => true //TODO: make notifications screen //this.props.history.push('/notifications/')

    goToSettings = () => {
        this.setState({ selectedTab: null })
        this.props.history.push('/app/profile')
    }

    goToAllCourses = () => {
        this.setState({ selectedTab: 'all' })
        this.props.history.push('/app/courses/all')
    }

    goToMyCourses = () => {
        this.setState({ selectedTab: 'my' })
        this.props.history.push('/app/courses')
    }

    isMyCourses = () => this.props.location.pathname === '/app/courses'

    isAllCourses = () =>
        this.props.location.pathname.includes('/search') || this.props.location.pathname.includes('/all')

    exit = async () => {
        await this.props.exitProfile()
        this.props.history.push('/login')
    }

    render() {
        const { selectedTab } = this.state
        const { buttonIndexActive, profileData } = this.props
        const active = this.activeButton(buttonIndexActive)
        return (
            <LeftPanelContainer>
                <div style={{ padding: '0px 0px 0px 50px' }}>
                    <div style={{ display: 'flex' }}>
                        <BorderedImage
                            image={
                                (profileData && profileData.avatar && profileData.avatar.original.url) ||
                                DEFAULT_AVATAR_IMAGE_URL
                            }
                        />
                        <LeftPanelNavigation style={{ justifyContent: 'space-between' }}>
                            <SizedIconButton
                                width={18}
                                margin={'6px 20px'}
                                children={
                                    <BorderedImage image={'/images/notifications.svg'} width={'18px'} height={'18px'} />
                                }
                                onClick={this.goToNotifications}
                            />
                            <SizedIconButton
                                width={18}
                                margin={'6px 20px'}
                                children={
                                    <BorderedImage image={'/images/settings.svg'} width={'18px'} height={'18px'} />
                                }
                                onClick={this.goToSettings}
                            />
                            <SizedIconButton
                                width={18}
                                margin={'6px 20px'}
                                children={<BorderedImage image={'/images/exit.svg'} width={'18px'} height={'18px'} />}
                                onClick={this.exit}
                            />
                        </LeftPanelNavigation>
                    </div>
                    <StudentTypography fontSize={20} mainColor>
                        {profileData.fullName}
                    </StudentTypography>
                </div>
                <LeftPanelNavigation>
                    <LeftPanelNavigationItem active={selectedTab === 'my'} onClick={() => this.goToMyCourses()}>
                        <StudentTypography>Мои курсы</StudentTypography>
                    </LeftPanelNavigationItem>
                    <LeftPanelNavigationItem active={selectedTab === 'all'} onClick={() => this.goToAllCourses()}>
                        <StudentTypography>Все курсы</StudentTypography>
                    </LeftPanelNavigationItem>
                </LeftPanelNavigation>
            </LeftPanelContainer>
        )
    }
}

export default withRouter(withProviders(AccountProvider, AuthorizationProvider, SearchProvider)(LeftPanel))
