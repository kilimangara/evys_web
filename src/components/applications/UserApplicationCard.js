import React, { Component } from 'react'
import { H2, H4, WithVerticalMargin } from '../styled/common'
import {
    ApplicationCardImage,
    ApplicationCardImageContainer,
    ApplicationCardWrapper,
    ApplicationDescription,
    ApplicationName,
    HoverFade
} from '../styled/admin/Applications'

export class UserApplicationCard extends Component {
    render() {
        const { name, imageSource, description, contacts, onOpenApp } = this.props
        return (
            <ApplicationCardWrapper width={'300px'} borderRadius={'5px'} onClick={onOpenApp}>
                <ApplicationCardImageContainer>
                    <ApplicationCardImage src={imageSource} />
                </ApplicationCardImageContainer>
                <ApplicationName>
                    <H2>{name}</H2>
                </ApplicationName>
                <ApplicationDescription>
                    <WithVerticalMargin margin={'10px'}>
                        <H4>{description}</H4>
                    </WithVerticalMargin>
                    {contacts.split(/(?:\r\n|\r|\n)/g).map((el, index) => (
                        <H4 key={index}>{el}</H4>
                    ))}
                </ApplicationDescription>
            </ApplicationCardWrapper>
        )
    }
}
