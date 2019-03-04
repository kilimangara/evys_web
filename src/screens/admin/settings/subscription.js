import React from 'react'
import BillingProvider from '../../../mixins/admin/BillingProvider'
import styled from 'styled-components'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/lab/Slider'
import { pick, debounce } from 'lodash'
import Divider from '@material-ui/core/Divider'
import InfoIcon from '@material-ui/icons/HelpOutline'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import { Card } from './index'
import Button from '@material-ui/core/Button'
import { theme } from '../../../utils/global_theme'
import { withSnackbar } from 'notistack'

const Header = styled(Typography)`
    font-weight: 600;
    font-size: 24px;
    color: black;
`

const CurrencyText = styled(Typography)`
    font-weight: 300;
    font-size: 16px;
    color: black;
    margin-left: 4px;
`

const SliderHeader = styled(Typography)`
    font-weight: 300;
    font-size: 20px;
    color: black;
`

const SliderValue = styled(Typography)`
    font-weight: 300;
    font-size: 18px;
    color: gray;
    margin-top: ${({ marginTop = 0 }) => `${marginTop}px`};
`
const IconButtonForHelp = styled(IconButton)`
    padding: 6px;
`

const SliderContainer = styled.div`
    margin-top: 24px;
`

const ColoredButton = styled(Button)`
    background-color: ${({ disabled }) => (!disabled ? theme.ACCENT_COLOR : theme.ACCENT_COLOR_A(0.5))};
    color: white;
`

const Container = styled.div`
    display: flex;
    margin-top: 12px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
`

const formatter = new Intl.NumberFormat('ru', {
    style: 'decimal',
    currency: 'RUB',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
})

class BillingPlanScreen extends BillingProvider(React.Component) {
    state = {
        billingPlan: null,
        changed: false,
        personalStudents: null,
        personalSubjects: null
    }

    componentDidMount() {
        this.loadBillingPlan()
        this.showErrorDebounced = debounce(this.showError, 5000, { leading: true })
    }

    handleSlider = field => (event, value) => {
        this.setState({ [field]: value }, this.syncBillingData)
    }

    showError = error => {
        const formattedError = error.join(', ')
        this.props.enqueueSnackbar(formattedError, { variant: 'error' })
    }

    syncBillingData = () => {
        this.createDraftBillingPlan(pick(this.state, ['personalStudents', 'personalSubjects'])).catch(
            ({ response }) => {
                this.showErrorDebounced(response.data)
            }
        )
    }

    createBillingData = () => {
        this.changeBillingPlan(pick(this.state, ['personalStudents', 'personalSubjects'])).catch(({ response }) => {
            this.showErrorDebounced(response.data)
        })
    }

    canPay = () => {
        const { changed } = this.state
        return changed
    }

    paymentText = () => {
        const { billingPlan, changed } = this.state
        if (billingPlan.toPay) return `Оплатить ${billingPlan.toPay} ₽`
        if (!changed) return 'Выберите свой тарифный план'
        return `Повысить тариф`
    }

    render() {
        const { billingPlan, changed, personalStudents, personalSubjects } = this.state
        const { classes } = this.props
        if (!billingPlan)
            return (
                <div>
                    <LinearProgress />
                </div>
            )
        return (
            <Container>
                <Card>
                    <Header>Тариф</Header>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Header component={'span'}>{formatter.format(billingPlan.amount)}</Header>
                        <CurrencyText component={'span'}>₽/мес</CurrencyText>
                    </div>
                    <Divider />
                    <SliderContainer>
                        <div style={{ marginTop: 0, display: 'flex', marginBottom: 18, alignItems: 'center' }}>
                            <SliderHeader component="span">Учеников:</SliderHeader>
                            <SliderValue component="span"> {billingPlan.personalStudents}</SliderValue>
                            <Tooltip title={`Стоимость 25 учеников - ${billingPlan.studentPrice} ₽/мес`}>
                                <IconButtonForHelp>
                                    <InfoIcon fontSize={'small'} />
                                </IconButtonForHelp>
                            </Tooltip>
                        </div>
                        <Slider
                            min={50}
                            max={1000}
                            step={25}
                            classes={{ track: classes.sliderHeight }}
                            value={billingPlan.personalStudents}
                            onChange={this.handleSlider('personalStudents')}
                        />
                    </SliderContainer>
                    <SliderContainer>
                        <div style={{ marginTop: 48, display: 'flex', marginBottom: 18, alignItems: 'center' }}>
                            <SliderHeader component="span">Предметов:</SliderHeader>
                            <SliderValue component="span"> {billingPlan.personalSubjects}</SliderValue>
                            <Tooltip title={`Стоимость 1 предмета - ${billingPlan.subjectPrice} ₽/мес`}>
                                <IconButtonForHelp>
                                    <InfoIcon fontSize={'small'} />
                                </IconButtonForHelp>
                            </Tooltip>
                        </div>
                        <Slider
                            min={1}
                            max={26}
                            step={1}
                            classes={{ track: classes.sliderHeight }}
                            value={billingPlan.personalSubjects}
                            onChange={this.handleSlider('personalSubjects')}
                        />
                    </SliderContainer>
                    <div style={{ height: 24 }} />
                    <ColoredButton disabled={!this.canPay()} onClick={this.createBillingData}>
                        {this.paymentText()}
                    </ColoredButton>
                </Card>
            </Container>
        )
    }
}

const styles = theme => ({
    sliderHeight: {
        height: 4
    }
})

export default withStyles(styles)(withSnackbar(BillingPlanScreen))