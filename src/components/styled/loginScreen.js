import { Card, TextField } from '@material-ui/core'
import styled from 'styled-components'

export const LoginCard = styled(Card)`
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    padding: 12px 24px;
`

export const LoginCardContent = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const LoginField = styled(TextField)`
    display: flex;
`
