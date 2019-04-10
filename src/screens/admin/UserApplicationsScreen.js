import React, { Component } from 'react'
import { ApplicationsList } from '../../components/styled/admin/Applications'
import {
    CenteredContent,
    ColoredButton,
    ColumnFlexed,
    FullsizeCentered,
    H2,
    HorizontalCentered,
    RowFlexed,
    WithVerticalMargin
} from '../../components/styled/common'
import { getUserApplications } from '../../api'
import { UserApplicationCard } from '../../components/applications/UserApplicationCard'
import { withRouter } from 'react-router'
import { theme } from '../../utils/global_theme'
import withProviders from '../../utils/withProviders'
import { NavigationProvider } from '../../mixins/admin/NavigatableComponent'

class UserApplicationsScreen extends Component {
    state = {
        applications: null
    }
    componentDidMount() {
        this.changeHeader('Мои приложения')
        getUserApplications().then(res => this.setState({ applications: res.data }))
    }

    openApp = url => {
        this.props.history.push(url)
    }

    goToMarketplace = () => {
        this.props.history.push('/admin/marketplace')
    }

    render() {
        const { applications } = this.state
        return (
            <FullsizeCentered>
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
                            <ColoredButton
                                color={theme.ACCENT_COLOR}
                                textColor={theme.CONTRAST_LIGHT}
                                textHover={theme.CONTRAST_LIGHT}
                                colorHover={theme.SECONDARY_LIGHT}
                                onClick={this.goToMarketplace}
                            >
                                перейти в список приложений
                            </ColoredButton>
                        </WithVerticalMargin>
                    </ColumnFlexed>
                )}
            </FullsizeCentered>
        )
    }
}

export default withProviders(NavigationProvider)(withRouter(UserApplicationsScreen))
