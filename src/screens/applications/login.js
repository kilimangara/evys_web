import React from 'react'
import withProviders from '../../utils/withProviders'
import { compose } from 'recompose'
import { loadAccount, saveAccount, saveToken, saveName } from '../../reducers/admin/application'
import styled from 'styled-components'
import { withRouter, Redirect } from 'react-router'
import SaveButton from '../../components/common/SaveButton'
import TextField from '@material-ui/core/TextField'

const Container = styled.div`
    display: flex;
    padding: 24px 12px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
`

export const Card = styled.div`
    margin-top: ${({ marginTop = 0 }) => `${marginTop}px`};
    border: 1px solid rgba(0, 0, 0, 0.12);
    background-color: white;
    box-shadow: 0 0 1px #bdbfc1, 0 1px #ced2d3;
    padding: ${({ noPadding }) => (noPadding ? '0px' : '12px')};
`

class AuthComponent extends React.Component {
    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search)
        this.props.saveToken(params.get('token'))
        this.props.saveName(params.get('account'))
        this.props.preAuthRequest()
    }

    render() {
        return <Redirect to={this.props.to} />
    }
}

class ApplicationAuthProvider {
    static mapStateToProps = state => ({})

    static mapDispatchToProps = {
        saveToken,
        saveName
    }
}

const enhance = compose(
    withProviders(ApplicationAuthProvider),
    withRouter
)

export default enhance(AuthComponent)
