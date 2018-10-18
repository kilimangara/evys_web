import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getCode, sendCode, saveStepIndex } from '../actions/CodeActions'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import { blue500 } from 'material-ui/styles/colors'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: '',
            code: '',
            errors: {},
            loading: false
        }
    }

    componentWillMount = () => {
        if (this.props.authenticated) this.props.history.push('/app/profile')
    }

    renderVerifyStage = () => {
        const { phone, errors, code } = this.state
        return (
            <div style={styles.wrapper}>
                <TextField
                    style={styles.fieldStyle}
                    errorText={errors.code}
                    name="code"
                    floatingLabelText="Код"
                    value={code}
                    floatingLabelFocusStyle={{ color: blue500 }}
                    underlineFocusStyle={{ borderColor: blue500 }}
                    onChange={this.handleChange}
                />
                <RaisedButton
                    style={styles.fieldStyle}
                    label="Подтвердить"
                    backgroundColor={blue500}
                    labelColor={'white'}
                    onClick={this.handlePress}
                />
            </div>
        )
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    newStepIndex = index => {
        this.setState({ loading: true }, () => {
            this.props.saveStepIndex(index)
            setTimeout(() => this.setState({ loading: false }), 500)
        })
    }

    handlePress = () => {
        if (this.props.stepIndex === 0) {
            this.props
                .getCode(this.state.phone)
                .then(() => this.newStepIndex(1))
                .catch(() => this.setState({ errors: { phone: 'Неправильный формат' } }))
            return
        }

        if (this.props.stepIndex === 1) {
            this.props
                .sendCode(this.state.phone, this.state.code)
                .then(() => this.newStepIndex(2))
                .catch(() => this.setState({ errors: { phone: 'Неправильный формат' } }))
            return
        }
    }

    renderCodeStage = () => {
        const { phone, errors } = this.state
        return (
            <div style={styles.wrapper}>
                <TextField
                    style={styles.fieldStyle}
                    errorText={errors.phone}
                    name="phone"
                    floatingLabelFocusStyle={{ color: blue500 }}
                    underlineFocusStyle={{ borderColor: blue500 }}
                    floatingLabelText="Номер телефона"
                    value={phone}
                    onChange={this.handleChange}
                />
                <RaisedButton
                    style={styles.fieldStyle}
                    label="Отправить смс"
                    backgroundColor={blue500}
                    labelColor={'white'}
                    onClick={this.handlePress}
                />
            </div>
        )
    }

    telegramLink = () => {
        const { userId } = this.props
        let res = `https://telegram.me/evys_bot?start=${userId}`
        if (__DEV__) res = `https://telegram.me/evys_dev_bot?start=${userId}`
        return res
    }

    goToProfile = () => {
        this.props.history.push('/app/profile')
    }

    renderTelegramLink = () => {
        return (
            <div style={styles.wrapper}>
                <span style={{ fontSize: 18, color: 'black' }}>Осталось только заполнить профиль</span>
                <RaisedButton
                    style={styles.fieldStyle}
                    label="В профиль"
                    backgroundColor={blue500}
                    labelColor={'white'}
                    onClick={this.goToProfile}
                />
            </div>
        )
    }

    renderContent = () => {
        switch (this.props.stepIndex) {
            case 0:
                return this.renderCodeStage()
            case 1:
                return this.renderVerifyStage()
            case 2:
                return this.renderTelegramLink()
        }
    }

    dummyAsync = cb => {
        this.setState({ loading: true }, () => {
            this.asyncTimer = setTimeout(cb, 200)
        })
    }

    render() {
        return (
            <div style={styles.wrapper}>
                <Stepper activeStep={this.props.stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Введите номер</StepLabel>
                        <StepContent> {this.renderContent()}</StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Подтвердите свой номер</StepLabel>
                        <StepContent> {this.renderContent()}</StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Используйте бота в телеграме</StepLabel>
                        <StepContent> {this.renderContent()}</StepContent>
                    </Step>
                </Stepper>
            </div>
        )
    }
}

const styles = {
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    card: {
        display: 'flex',
        margin: 'auto',
        alignItems: 'center',
        flexDirection: 'column'
    },
    fieldStyle: {
        margin: '5px'
    }
}

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
    userId: state.auth.user_id,
    stepIndex: state.first_steps.stepIndex
})

export default connect(
    mapStateToProps,
    { getCode, sendCode, saveStepIndex }
)(Login)
