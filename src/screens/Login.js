import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCode, sendCode, saveStepIndex } from '../actions/CodeActions'
import { Step } from '@material-ui/core/'
import { CenteredContent, ColoredButton, Error, WithVerticalMargin } from '../components/styled/common'
import { LoginContainer, LoginDataWrapper } from '../components/styled/authorization'
import { LoginStepLabel, LoginStepper, PhoneNumberInput } from '../components/styled/authorization'
import { studentTheme } from '../utils/global_theme'
import ReactCodeInput from 'react-code-input'
import { withWidth } from '@material-ui/core'

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
        const { errors } = this.state
        return (
            <CenteredContent>
                <ReactCodeInput
                    type="text"
                    name="code"
                    onChange={this.handleCodeChange}
                    fields={6}
                    inputStyle={{
                        width: '25px',
                        height: '40px',
                        fontFamily: studentTheme.FONT,
                        fontSize: studentTheme.H3,
                        backgroundColor: studentTheme.INPUT_COLOR,
                        color: studentTheme.TEXT_COLOR,
                        border: '0',
                        margin: '4px',
                        outline: 'none',
                        paddingLeft: '15px'
                    }}
                />
                {errors && errors.phone && <Error>{errors.phone}</Error>}
            </CenteredContent>
        )
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCodeChange = code => {
        if (code.length === 6) {
            this.props
                .sendCode(this.state.phone, code)
                .then(() => this.goToProfile())
                .catch(() => this.setState({ errors: { phone: 'Неправильный формат' } }))
        }
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
                .then(() => {
                    this.newStepIndex(1)
                    this.setState({ errors: { phone: null } })
                })
                .catch(() => this.setState({ errors: { phone: 'Неправильный формат' } }))
        }
    }

    renderPhoneStage = () => {
        const { errors } = this.state
        return (
            <CenteredContent style={{ width: '100%' }}>
                <WithVerticalMargin margin={'10px'}>
                    <PhoneNumberInput
                        placeholder="Введите номер телефона"
                        name={'phone'}
                        onChange={this.handleChange}
                    />
                    {errors && errors.phone && <Error>{errors.phone}</Error>}
                    <ColoredButton
                        variant="contained"
                        labelColor={'white'}
                        onClick={this.handlePress}
                        style={{ maxWidth: '100px' }}
                    >
                        отправить
                    </ColoredButton>
                </WithVerticalMargin>
            </CenteredContent>
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

    renderContent = () => {
        switch (this.props.stepIndex) {
            case 0:
                return this.renderPhoneStage()
            case 1:
                return this.renderVerifyStage()
        }
    }

    dummyAsync = cb => {
        this.setState({ loading: true }, () => {
            this.asyncTimer = setTimeout(cb, 200)
        })
    }

    render() {
        const { stepIndex, width } = this.props
        return (
            <LoginContainer>
                <LoginDataWrapper>
                    <LoginStepper activeStep={stepIndex} orientation={width === 'xs' ? 'vertical' : 'horizontal'}>
                        <Step>
                            <LoginStepLabel>Номер телефона</LoginStepLabel>
                        </Step>
                        <Step>
                            <LoginStepLabel>Проверочный код</LoginStepLabel>
                        </Step>
                    </LoginStepper>
                    {this.renderContent()}
                </LoginDataWrapper>
            </LoginContainer>
        )
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
)(withWidth()(Login))
