import React from 'react'
import { Card, TextField, Button } from '@material-ui/core'
import styled from 'styled-components'

export const AuthCard = styled(Card)`
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    padding: 12px 24px;
`

export const AuthCardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 400px;
`

export const AuthField = styled(TextField)`
    display: flex;
`

export const AuthButton = styled(({ color, ...props }) => <Button {...props} />)`
    color: white;
    background-color: ${({ color }) => color || 'gray'};
    margin-top: 20px;
`
