import React, { Component } from 'react'
import { AddAppFab, ApplicationsList } from '../../components/styled/admin/Applications'
import {
    CenteredContent,
    ColoredButton,
    ColumnFlexed,
    FullsizeCentered,
    H2,
    HorizontalCentered,
    RowFlexed,
    WithHorizontalMargin,
    WithVerticalMargin
} from '../../components/styled/common'
import Add from '@material-ui/icons/Add'
import { getUserApplications } from '../../api'
import { UserApplicationCard } from '../../components/applications/UserApplicationCard'
import { withRouter } from 'react-router'
import { theme } from '../../utils/global_theme'
import withProviders from '../../utils/withProviders'
import withNav, { NavigationProvider } from '../../mixins/admin/NavigatableComponent'

class UserApplicationsScreen extends withNav(Component) {
    state = {
        applications: null
    }
    componentDidMount() {
        this.changeHeader('Мои приложения')
        getUserApplications().then(res => this.setState({ applications: res.data }))
    }

    openApp = url => {
        window.open(url)
    }

    goToMarketplace = () => {
        this.props.history.push('/admin/marketplace')
    }

    goToWiki = () => {
        // this.props.history.push('')
    }

    render() {
        const { applications } = this.state
        return (
            <FullsizeCentered>
                <AddAppFab onClick={this.goToMarketplace}>
                    <Add />
                </AddAppFab>
                {(applications || []).length ? (
                    <HorizontalCentered>
                        <ApplicationsList>
                            {applications.map(({ title, image, description, contacts, fullLoginUrl }) => (
                                <UserApplicationCard
                                    name={title}
                                    imageSource={image}
                                    description={description}
                                    contacts={contacts}
                                    onOpenApp={() => this.openApp(fullLoginUrl)}
                                />
                            ))}
                        </ApplicationsList>
                    </HorizontalCentered>
                ) : (
                    <ColumnFlexed align={'center'}>
                        <H2>Установленные приложения отсутствуют</H2>
                        <WithVerticalMargin margin={'10px'}>
                            <RowFlexed>
                                <WithHorizontalMargin margin={5}>
                                    <ColoredButton
                                        color={theme.ACCENT_COLOR}
                                        textColor={theme.CONTRAST_LIGHT}
                                        textHover={theme.CONTRAST_LIGHT}
                                        colorHover={theme.SECONDARY_LIGHT}
                                        onClick={this.goToWiki}
                                    >
                                        подробнее
                                    </ColoredButton>
                                </WithHorizontalMargin>
                                <WithHorizontalMargin margin={5}>
                                    <ColoredButton
                                        color={theme.ACCENT_COLOR}
                                        textColor={theme.CONTRAST_LIGHT}
                                        textHover={theme.CONTRAST_LIGHT}
                                        colorHover={theme.SECONDARY_LIGHT}
                                        onClick={this.goToMarketplace}
                                    >
                                        перейти в список приложений
                                    </ColoredButton>
                                </WithHorizontalMargin>
                            </RowFlexed>
                        </WithVerticalMargin>
                    </ColumnFlexed>
                )}
            </FullsizeCentered>
        )
    }
}

export default withProviders(NavigationProvider)(withRouter(UserApplicationsScreen))
