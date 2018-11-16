import React from 'react'
import { Card, TextField, Button, Stepper, StepLabel, StepConnector } from '@material-ui/core'
import styled from 'styled-components'
import { studentTheme } from '../../utils/global_theme'

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

export const PhoneNumberInput = styled.input`
    background: ${studentTheme.INPUT_COLOR};
    height: 40px;
    border: 0;
    border-radius: 2px;
    padding-left: 10px;
    font: ${studentTheme.H3} ${studentTheme.FONT};
    color: ${studentTheme.TEXT_COLOR};
    width: 50%;
    min-width: 300px;
    max-width: 500px;

    :focus {
        outline: none;
    }
`

export const LoginStepper = styled(({ ...props }) => (
    <Stepper
        {...props}
        connector={<StepConnector classes={{ root: 'connector', completed: 'connectorCompleted', line: 'line' }} />}
    />
))`
    background: transparent;
    width: 60%;

    & .connector {
        & .line {
            border-color: ${studentTheme.PRIMARY_LIGHT};
        }
    }

    & .connectorCompleted {
        & .line {
            border-color: ${studentTheme.ACCENT};
        }
    }
`

export const LoginStepLabel = styled(({ ...props }) => (
    <StepLabel
        {...props}
        StepIconProps={{
            classes: { root: 'icon', text: 'iconText', active: 'iconActive', completed: 'iconCompleted' }
        }}
        classes={{
            label: 'label',
            completed: 'completed',
            disabled: 'disabled',
            active: 'active',
            iconContainer: 'iconContainer'
        }}
    />
))`
    font-size: ${studentTheme.H2};
    & .label {
        color: ${studentTheme.PRIMARY_LIGHT};
        font: ${studentTheme.H1} ${studentTheme.FONT};
    }
    & .active,
    .completed {
        color: ${studentTheme.TEXT_COLOR};
    }

    & .iconText {
        fill: ${studentTheme.PRIMARY};
    }
    & .icon {
        color: ${studentTheme.PRIMARY_LIGHT};
        transform: scale(1.3);
    }

    & .iconActive {
        color: ${studentTheme.ACCENT};
    }
`

export const LoginContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const LoginDataWrapper = styled.div`
    display: flex;
    height: 400px;
    justify-content: space-between;
    width: 100%;
    flex-direction: column;
    align-items: center;
`
