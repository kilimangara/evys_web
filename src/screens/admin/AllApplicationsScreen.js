import React, { Component } from 'react'
import { ApplicationListWrapper, ApplicationsList } from '../../components/styled/admin/Applications'
import { CenteredContent, H2, HorizontalCentered } from '../../components/styled/common'
import { getAllApplications } from '../../api'
import { withRouter } from 'react-router'
import { AllApplicationCard } from '../../components/applications/AllApplicationsCard'
import withProviders from '../../utils/withProviders'
import { NavigationProvider } from '../../mixins/admin/NavigatableComponent'

class AllApplicationsScreen extends Component {
    state = {
        applications: null
    }
    componentDidMount() {
        this.changeHeader('Магазин приложений')
        getAllApplications().then(res => this.setState({ applications: res.data }))
    }

    handleAppInstall = url => {
        this.props.history.push(url)
    }

    render() {
        const { applications } = this.state

        return (
            <div>
                {(applications || []).length ? (
                    <HorizontalCentered>
                        <ApplicationsList>
                            {applications.map(({ title, image, description, contacts, installUrl }) => (
                                <AllApplicationCard
                                    name={title}
                                    imageSource={image}
                                    description={description}
                                    contacts={contacts}
                                    installUrl={installUrl}
                                    onAppInstall={this.handleAppInstall}
                                />
                            ))}
                        </ApplicationsList>
                    </HorizontalCentered>
                ) : (
                    <CenteredContent>
                        <H2>Установленные приложения отсутствуют</H2>
                    </CenteredContent>
                )}
            </div>
        )
    }
}

export default withProviders(NavigationProvider)(withRouter(AllApplicationsScreen))
