import React from 'react'
import BillingProvider from '../../../mixins/admin/BillingProvider'
import styled from 'styled-components'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import SaveButton from '../../../components/common/SaveButton'
import Slider from '@material-ui/lab/Slider'
import { pick } from 'lodash'
import Divider from '@material-ui/core/Divider'
import InfoIcon from '@material-ui/icons/HelpOutline'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

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

export const Card = styled.div`
    margin-top: ${({ marginTop = 0 }) => `${marginTop}px`};
    border: 1px solid rgba(0, 0, 0, 0.12);
    background-color: white;
    box-shadow: 0 0 1px #bdbfc1, 0 1px #ced2d3;
    padding: 12px;
`
const Container = styled.div`
    display: flex;
    padding: 24px 12px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
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
    }

    handleSlider = field => (event, value) => {
        console.log(event, value, field)
        this.setState({ [field]: value }, this.syncBillingData)
    }

    syncBillingData = () => {
        this.createDraftBillingPlan(pick(this.state, ['personalStudents', 'personalSubjects']))
    }

    render() {
        const { billingPlan, changed, personalStudents, personalSubjects } = this.state
        const { classes } = this.props
        console.log(billingPlan)
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
                    <SaveButton placeholder={'Оплатить'} />
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

export default withStyles(styles)(BillingPlanScreen)
