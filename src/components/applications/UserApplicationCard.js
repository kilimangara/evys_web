import React, { Component } from 'react'
import { H2, H4, WithVerticalMargin, ColoredButton } from '../styled/common'
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

export class UserApplicationCard extends Component {
    state = {
        hovered: false
    }

    handleHover = hover => {
        this.setState({ hovered: hover })
    }

    render() {
        const { name, imageSource, description, contacts, onOpenApp, onUninstallApp } = this.props
        const { hovered } = this.state
        return (
            <ApplicationCardWrapper
                width={'300px'}
                borderRadius={'5px'}
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
            >
                <HoverFade in={hovered} timeout={200} unmountOnExit>
                    <ApplicationCardHover onOpenApp={onOpenApp} onUninstallApp={onUninstallApp} />
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
                    {contacts.split(/(?:\r\n|\r|\n)/g).map((el, index) => (
                        <H4 key={index}>{el}</H4>
                    ))}
                </ApplicationDescription>
            </ApplicationCardWrapper>
        )
    }
}

const ApplicationCardHover = ({ onUninstallApp, onOpenApp }) => (
    <ApplicationCardHoverBlock>
        <HoverGradient />
        <HoverFill>
            <ColoredButton
                color={theme.ACCENT_COLOR}
                textColor={theme.CONTRAST_LIGHT}
                textHover={theme.CONTRAST_LIGHT}
                colorHover={theme.SECONDARY_LIGHT}
                onClick={onOpenApp}
            >
                Войти
            </ColoredButton>
            <div style={{ height: 24 }} />
            <ColoredButton
                color="primary"
                color={theme.ACCENT_COLOR}
                textColor={theme.CONTRAST_LIGHT}
                textHover={theme.CONTRAST_LIGHT}
                colorHover={theme.SECONDARY_LIGHT}
                onClick={onUninstallApp}
            >
                Удалить
            </ColoredButton>
        </HoverFill>
    </ApplicationCardHoverBlock>
)
