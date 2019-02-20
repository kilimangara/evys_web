import React, { Component } from 'react'
import { differenceInMilliseconds, isAfter, format, setMilliseconds } from 'date-fns'
import { H3, WithHorizontalMargin } from '../styled/common'

export class ElementCountdown extends Component {
    state = {
        timerFinished: false,
        timeTo: null,
        remainingTime: null
    }
    componentDidMount() {
        this.resetTime()
    }

    resetTime = () => {
        this.props.onTimerReset()
        const { time } = this.props
        this.setState({ remainingTime: time * 1000, timerFinished: false })
        this.int = setInterval(this.calcRemainingTime, 1000)
    }

    msToTime = s => {
        const pad = (n, z = 2) => ('00' + n).slice(-z)
        return pad(((s % 3.6e6) / 6e4) | 0) + ':' + pad(((s % 6e4) / 1000) | 0)
    }

    calcRemainingTime = () => {
        const { remainingTime } = this.state
        if (remainingTime <= 0) {
            this.setState({ timerFinished: true })
            clearInterval(this.int)
            this.props.onTimerFinished()
        }
        this.setState({ remainingTime: remainingTime - 1000 })
    }

    render() {
        const { remainingTime, timerFinished } = this.state
        return (
            <WithHorizontalMargin margin={10}>
                {timerFinished ? (
                    <div onClick={this.resetTime}>{this.props.children}</div>
                ) : (
                    <H3>{this.msToTime(remainingTime)}</H3>
                )}
            </WithHorizontalMargin>
        )
    }
}
