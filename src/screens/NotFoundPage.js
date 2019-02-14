import React, { Component } from 'react'
import { H1, HorizontalCentered } from '../components/styled/common'

export class NotFoundPage extends Component{
    render() {
        return (
            <HorizontalCentered style={{height: '100%'}}>
                <H1>404 BRATAN</H1>
            </HorizontalCentered>
        )
    }
}

export default NotFoundPage
