import React, { Component } from 'react'
import Slider from '@material-ui/lab/Slider'
import moment from 'moment'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 24px;

`

export default class DurationPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.defaultValue
        }
    }

    humanize = hour => {
        return `${hour} часа`
    }

    handleSlider = (event, value) => {
        this.setState({ value })
        this.props.valueChanged(moment.duration(value, 'hours').toISOString())
    }

    render() {
        const { minHours, maxHours } = this.props
        const { value } = this.state
        return (
            <Container>
                <Slider
                    min={minHours}
                    max={maxHours}
                    step={1}
                    value={value}
                    onChange={this.handleSlider}
                />
                <p>
                    <span>
                        {this.props.labelText}: {this.humanize(value)}
                    </span>
                </p>
            </Container>
        )
    }
}

const styles = {

}

DurationPicker.defaultProps = {
    minHours: 1,
    maxHours: 72,
    defaultValue: 3,
    valueChanged: newValue => {}
}
