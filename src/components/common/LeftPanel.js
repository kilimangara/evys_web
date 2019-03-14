import React, { Component } from 'react'
import classNames from 'classnames'
import { LeftPanelContainer, LeftPanelNavigation, LeftPanelNavigationItem } from '../styled/layout'
import {
    BorderedImage,
    NotificationsCircle,
    RelativeBorderedImage,
    SizedIconButton,
    StudentTypography
} from '../styled/common'
import IconButton from '@material-ui/core/IconButton/IconButton'
import { withRouter } from 'react-router'
import { AccountProvider } from '../../mixins/student/AccountRepository'
import withProviders from '../../utils/withProviders'
import { DEFAULT_AVATAR_IMAGE_URL } from '../../screens/ProfileScreen'
import { AuthorizationProvider } from '../../mixins/student/AuthorizationRepository'
import { SearchProvider } from '../../mixins/student/SearchRepository'
import { NotificationsProvider } from '../../mixins/student/NotificationsRepository'

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
            } else if (!this.isAllCourses() && !this.isMyCourses()) {
                this.setState({ selectedTab: null })
            }
        }
    }

    goToNotifications = () => {
        this.setState({ selectedTab: null })
        this.props.history.push('/app/notifications/')
    }

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
        const { buttonIndexActive, profileData, hasNotifications } = this.props
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
                                    <RelativeBorderedImage
                                        image={'/frontend/images/notifications.svg'}
                                        width={'18px'}
                                        height={'18px'}
                                    >
                                        {hasNotifications && <NotificationsCircle />}
                                    </RelativeBorderedImage>
                                }
                                onClick={this.goToNotifications}
                            />
                            <SizedIconButton
                                width={18}
                                margin={'6px 20px'}
                                children={
                                    <BorderedImage
                                        image={'/frontend/images/settings.svg'}
                                        width={'18px'}
                                        height={'18px'}
                                    />
                                }
                                onClick={this.goToSettings}
                            />
                            <SizedIconButton
                                width={18}
                                margin={'6px 20px'}
                                children={
                                    <BorderedImage image={'/frontend/images/exit.svg'} width={'18px'} height={'18px'} />
                                }
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

export default withRouter(
    withProviders(AccountProvider, AuthorizationProvider, SearchProvider, NotificationsProvider)(LeftPanel)
)
