import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const Container = styled.div`
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`
const Text = styled(Typography)`
    font-weight: 300;
    font-size: 22px;
    color: black;
    text-align: center;
`

class AccountBlocked extends Component {
    render() {
        return (
            <Container>
                <img style={{ height: 250, width: 190 }} src={'/frontend/images/account_blocked.svg'} />
                <Text component={'span'}>Аккаунт заблокирован.</Text>
                <Button
                    color="primary"
                    variant={'contained'}
                    onClick={() => this.props.history.replace(`/admin/settings/billing_plan`)}
                >
                    Перейти к оплате
                </Button>
            </Container>
        )
    }
}

export default withRouter(AccountBlocked)
