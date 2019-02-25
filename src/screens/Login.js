import React, { Component } from 'react'
import {
    CenteredContent,
    CodeInput,
    ColoredButton,
    Error,
    H3,
    RowFlexed,
    WithVerticalMargin
} from '../components/styled/common'
import { studentTheme } from '../utils/global_theme'
import ReactCodeInput from 'react-code-input'
import AuthorisationMixin, { AuthorizationProvider } from '../mixins/student/AuthorizationRepository'
import { ElementCountdown } from '../components/common/ElementCountdown'
import withProviders from '../utils/withProviders'
import { Step, withWidth } from '@material-ui/core/es/index'
import {
    LoginContainer,
    LoginDataWrapper,
    LoginStepLabel,
    LoginStepper,
    PhoneNumberInput
} from '../components/styled/authorization'

class Login extends AuthorisationMixin(Component) {
    constructor(props) {
        super(props)
    }
    state = {
        phone: '',
        code: '',
        errors: {},
        loading: false,
        resendTimer: true
    }

    componentWillMount() {
        if (this.props.token) this.props.history.push('/app/profile')
    }

    resendCode = () => this.props.getCodeByPhoneNumber(this.state.phone || this.props.phone)

    renderVerifyStage = () => {
        const { errors, resendTimer } = this.state
        return (
            <CenteredContent>
                <CodeInput
                    type="number"
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
                <RowFlexed style={{ margin: '12px 0' }}>
                    {resendTimer && <H3>До повторной отправки </H3>}
                    <ElementCountdown
                        time={5}
                        onTimerFinished={this.resendTimerFinished}
                        onTimerReset={this.resendTimerReset}
                    >
                        <ColoredButton
                            color={studentTheme.BACKGROUND}
                            textColor={studentTheme.PRIMARY_LIGHT}
                            style={{ padding: '0 12px', margin: '12px 0' }}
                            onClick={this.resendCode}
                        >
                            отправить повторно
                        </ColoredButton>
                    </ElementCountdown>
                </RowFlexed>
                <ColoredButton
                    color={studentTheme.BACKGROUND}
                    textColor={studentTheme.PRIMARY_LIGHT}
                    style={{ padding: '0 12px', margin: '12px 0' }}
                    onClick={this.goToPhoneStage}
                >
                    назад к вводу номера
                </ColoredButton>
            </CenteredContent>
        )
    }

    handleChange = e => {
        const phoneRegex = /^([+()\-0-9 ])+$/
        if (e.target.name === 'phone' && (e.target.value !== '' && !e.target.value.match(phoneRegex))) {
            return
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCodeChange = code => {
        if (code.length === 6) {
            this.props
                .validateCode(this.state.phone, code)
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
                .getCodeByPhoneNumber(this.state.phone)
                .then(() => {
                    this.newStepIndex(1)
                    this.setState({ errors: { phone: null } })
                })
                .catch(() => this.setState({ errors: { phone: 'Неправильный формат' } }))
        }
    }

    resendTimerFinished = () => this.setState({ resendTimer: false })

    resendTimerReset = () => this.setState({ resendTimer: true })

    goToPhoneStage = () => this.newStepIndex(0)

    renderPhoneStage = () => {
        const { errors } = this.state
        return (
            <CenteredContent style={{ width: '100%' }}>
                <WithVerticalMargin margin={'10px'}>
                    <PhoneNumberInput
                        type={'tel'}
                        placeholder="Введите номер телефона"
                        name={'phone'}
                        value={this.state.phone}
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

export default withProviders(AuthorizationProvider)(withWidth()(Login))
