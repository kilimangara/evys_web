import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

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
        const zDepth = this.state.hovered ? 3 : this.props.initialZDepth
        return (
            <Paper
                style={this.props.style}
                zDepth={zDepth}
                onMouseOver={this.changeHovered.bind(this, true)}
                onMouseOut={this.changeHovered.bind(this, false)}
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
