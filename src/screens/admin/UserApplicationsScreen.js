import React, { Component } from 'react'
import { AddAppFab, ApplicationsList } from '../../components/styled/admin/Applications'
import {
    ColoredButton,
    ColumnFlexed,
    FullsizeBlock,
    FullsizeCentered,
    H2,
    HorizontalCentered,
    RowFlexed,
    WithHorizontalMargin,
    WithVerticalMargin
} from '../../components/styled/common'
import Add from '@material-ui/icons/Add'
import { getUserApplications, uninstallApp } from '../../api'
import { UserApplicationCard } from '../../components/applications/UserApplicationCard'
import { withRouter } from 'react-router'
import { theme } from '../../utils/global_theme'
import withProviders from '../../utils/withProviders'
import withNav, { NavigationProvider } from '../../mixins/admin/NavigatableComponent'
import LinearProgress from '@material-ui/core/LinearProgress'
import produce from 'immer'
import { compose } from 'recompose'
import { withSnackbar } from 'notistack'

class UserApplicationsScreen extends withNav(Component) {
    state = {
        applications: null
    }

    componentDidMount() {
        this.changeHeader('Мои приложения')
        getUserApplications().then(res => this.setState({ applications: res.data }))
    }

    uninstallApp = appId => {
        uninstallApp(appId).then(() => {
            this.props.enqueueSnackbar('Приложение удалено')
            this.setState(
                produce(draft => {
                    const appIndex = draft.applications.findIndex(el => el.id === appId)
                    if (appIndex !== -1) draft.applications.splice(appIndex, 1)
                })
            )
        })
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
        if (!applications)
            return (
                <div>
                    <LinearProgress color="primary" />
                </div>
            )
        return (
            <FullsizeBlock>
                <AddAppFab onClick={this.goToMarketplace}>
                    <Add />
                </AddAppFab>
                {applications.length ? (
                    <HorizontalCentered>
                        <ApplicationsList>
                            {applications.map(
                                ({ application: { title, image, description, contacts }, fullLoginUrl, id }) => (
                                    <UserApplicationCard
                                        key={id}
                                        name={title}
                                        imageSource={image}
                                        description={description}
                                        contacts={contacts}
                                        onUninstallApp={() => this.uninstallApp(id)}
                                        onOpenApp={() => this.openApp(fullLoginUrl)}
                                    />
                                )
                            )}
                        </ApplicationsList>
                    </HorizontalCentered>
                ) : (
                    <FullsizeCentered>
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
                    </FullsizeCentered>
                )}
            </FullsizeBlock>
        )
    }
}

const enhance = compose(
    withProviders(NavigationProvider),
    withRouter,
    withSnackbar
)

export default enhance(UserApplicationsScreen)
