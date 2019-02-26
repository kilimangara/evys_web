import React from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import green from '@material-ui/core/colors/green'
import Button from '@material-ui/core/Button'
import { theme } from '../../utils/global_theme'
import pt from 'prop-types'

const Container = styled.div`
    margin: 8px;
    position: relative;
`

const Progress = styled(CircularProgress)`
    color: ${green[500]};
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -12px;
    margin-left: -12px;
`

const CustomButton = styled(Button)`
    color: white;
    background-color: ${({ success }) => (!!success ? `${green[500]}` : `${theme.ACCENT_COLOR}`)};
`

export default class SaveButton extends React.Component {
    state = {
        success: false
    }

    success() {
        this.setState({ success: true })
        setTimeout(() => {
            this.setState({ success: false })
        }, 2000)
    }

    handleClick = () => {
        this.props.onClick && this.props.onClick()
    }

    render() {
        const { loading, placeholder } = this.props
        const { success } = this.state
        return (
            <Container>
                <CustomButton success={success ? 1 : 0} disabled={loading} type="contained" onClick={this.handleClick}>
                    {success ? 'Успешно' : placeholder || 'Сохранить'}
                </CustomButton>
                {loading && <Progress size={24} />}
            </Container>
        )
    }
}
