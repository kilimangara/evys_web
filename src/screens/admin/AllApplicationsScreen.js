import React, { Component } from 'react'
import { ApplicationListWrapper, ApplicationsList } from '../../components/styled/admin/Applications'
import { CenteredContent, H2, HorizontalCentered } from '../../components/styled/common'
import { getAllApplications, installApp } from '../../api'
import { withRouter } from 'react-router'
import { AllApplicationCard } from '../../components/applications/AllApplicationsCard'
import withProviders from '../../utils/withProviders'
import withNav, { NavigationProvider } from '../../mixins/admin/NavigatableComponent'
import { withSnackbar } from 'notistack'

class AllApplicationsScreen extends withNav(Component) {
    state = {
        applications: null
    }
    componentDidMount() {
        this.changeHeader('Магазин приложений')
        getAllApplications().then(res => this.setState({ applications: res.data }))
    }

    handleAppInstall = id => {
        installApp({ applicationId: id })
            .then(res => {
                this.props.enqueueSnackbar('Приложение успешно установлено', { variant: 'success' })
                getAllApplications().then(res => this.setState({ applications: res.data }))
            })
            .catch(err => {
                this.props.enqueueSnackbar('При установке приложения произошла ошибка', { variant: 'error' })
            })
    }

    render() {
        const { applications } = this.state

        return (
            <React.Fragment>
                {(applications || []).length ? (
                    <HorizontalCentered>
                        <ApplicationsList>
                            {applications.map(({ title, image, description, contacts, installUrl, id }) => (
                                <AllApplicationCard
                                    key={id}
                                    name={title}
                                    imageSource={image}
                                    description={description}
                                    contacts={contacts}
                                    installUrl={installUrl}
                                    onAppInstall={() => this.handleAppInstall(id)}
                                />
                            ))}
                        </ApplicationsList>
                    </HorizontalCentered>
                ) : (
                    <CenteredContent>
                        <H2>Приложения отсутствуют</H2>
                    </CenteredContent>
                )}
            </React.Fragment>
        )
    }
}

export default withProviders(NavigationProvider)(withSnackbar(withRouter(AllApplicationsScreen)))
