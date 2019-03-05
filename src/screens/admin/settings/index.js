import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import { pick } from 'lodash'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import BillingPlanScreen from './subscription'
import InvoicesScreen from './invoices'
import { Route } from 'react-router'

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

const ListHeader = styled(ListSubheader)`
    font-weight: 600;
    font-size: 18px;
    color: black;
`

const ListText = styled(ListItemText)`
    & > span {
        padding-left: 20px;
    }
`

class SettingsScreen extends React.Component {
    goTo = type => () => {
        switch (type) {
            case 'subscription':
                return this.props.history.replace(`/admin/settings/billing_plan`)
            case 'invoices':
                return this.props.history.replace(`/admin/settings/invoices`)
        }
    }

    render() {
        return (
            <Container>
                <Card>
                    <List subheader={<ListHeader disableSticky>Настройки аккаунта</ListHeader>} component="nav">
                        <ListItem button onClick={this.goTo('subscription')}>
                            <ListText primary="Подписка" />
                        </ListItem>
                        <ListItem button onClick={this.goTo('invoices')}>
                            <ListText primary="Счета на оплату" />
                        </ListItem>
                    </List>
                </Card>
                <Route exact path="/admin/settings/billing_plan" component={BillingPlanScreen} />
                <Route exact path="/admin/settings/invoices" component={InvoicesScreen} />
            </Container>
        )
    }
}

export default SettingsScreen
