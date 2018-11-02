import React, { Component } from 'react'
import {Paper} from "../styled/common";

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
            <Paper
                hovered={this.state.hovered}
                onMouseOver={this.changeHovered.bind(this, true)}
                onMouseOut={this.changeHovered.bind(this, false)}
                {...this.props}
            >
                {this.props.children}
            </Paper>
        )
    }
}

HoverPaper.defaultProps = {
    hovered: false,
    initialZDepth: 0,
    style: {}
}
