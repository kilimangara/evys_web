import React, { Component } from 'react'
import {Paper} from "../styled/common";

export default class HoverPaper extends Component
    constructor:(props) ->
        super(props)
        @state =
          hovered: this.props.hovered

    changeHovered: (hovered) =>
      @setState({ hovered })

    render: ->
      <Paper
          hovered={@state.hovered}
          onMouseOver={@changeHovered.bind(this, true)}
          onMouseOut={@changeHovered.bind(this, false)}
          {...@props}
      >
          {@props.children}
      </Paper>

HoverPaper.defaultProps =
    hovered: false
    initialZDepth: 0
    style: {}
