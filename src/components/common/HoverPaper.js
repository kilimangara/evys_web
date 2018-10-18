import React, { Component } from 'react'
import Styled from '../styled'

export default class HoverPaper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hovered: this.props.hovered
        }
    }

    changeHovered = hovered => {
        this.setState({ hovered })
    }

    render() {
        return (
            <Styled.Paper
                style={this.props.style}
                hovered={this.state.hovered}
                onMouseOver={this.changeHovered.bind(this, true)}
                onMouseOut={this.changeHovered.bind(this, false)}
            >
                {this.props.children}
            </Styled.Paper>
        )
    }
}

HoverPaper.defaultProps = {
    hovered: false,
    initialZDepth: 0,
    style: {}
}
