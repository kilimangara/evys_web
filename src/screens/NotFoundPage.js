import React, { Component } from 'react'
import { CenteredContent, FullPageOverlay, H1, HorizontalCentered } from '../components/styled/common'

export class NotFoundPage extends Component {
    render() {
        return (
            <FullPageOverlay>
                <CenteredContent>
                    <H1>404 Page not found</H1>
                </CenteredContent>
            </FullPageOverlay>
        )
    }
}

export default NotFoundPage
