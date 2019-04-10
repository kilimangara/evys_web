import React, { Component } from 'react'
import { ColoredButton, H2, H4, WithVerticalMargin } from '../styled/common'
import {
    ApplicationCardHoverBlock,
    ApplicationCardImage,
    ApplicationCardImageContainer,
    ApplicationCardWrapper,
    ApplicationDescription,
    ApplicationName,
    HoverFade,
    HoverFill,
    HoverGradient
} from '../styled/admin/Applications'
import { theme } from '../../utils/global_theme'

export class AllApplicationCard extends Component {
    state = {
        hovered: false
    }

    handleHover = hover => {
        this.setState({ hovered: hover })
    }

    render() {
        const { name, imageSource, description, contacts, installUrl, onAppInstall } = this.props
        const { hovered } = this.state
        return (
            <ApplicationCardWrapper
                width={'300px'}
                borderRadius={'5px'}
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
            >
                <HoverFade in={hovered} timeout={200} unmountOnExit>
                    <ApplicationCardHover onAppInstall={onAppInstall} installUrl={installUrl} />
                </HoverFade>
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
                    {contacts.split(/(?:\r\n|\r|\n)/g).map(el => (
                        <H4>{el}</H4>
                    ))}
                </ApplicationDescription>
            </ApplicationCardWrapper>
        )
    }
}

const ApplicationCardHover = ({ onAppInstall, installUrl }) => (
    <ApplicationCardHoverBlock>
        <HoverGradient />
        <HoverFill>
            <ColoredButton
                color={theme.ACCENT_COLOR}
                textColor={theme.CONTRAST_LIGHT}
                textHover={theme.CONTRAST_LIGHT}
                colorHover={theme.SECONDARY_LIGHT}
                onClick={() => onAppInstall(installUrl)}
            >
                установить
            </ColoredButton>
        </HoverFill>
    </ApplicationCardHoverBlock>
)
