import React, { Component } from 'react'
import moment from 'moment'
import Modal from 'reboron/ScaleModal'
import CreateAccount from '../../components/accounts/CreateAccount'
import withNav, { NavigationProvider } from '../../mixins/admin/NavigatableComponent'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'
import { AccountsProvider } from '../../mixins/admin/AccountsRepository'
import withProviders from '../../utils/withProviders'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components'
import { compose } from 'recompose'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 32px;
`

export const Card = styled.div`
    margin-top: ${({ marginTop = 0 }) => `${marginTop}px`};
    border: 1px solid rgba(0, 0, 0, 0.12);
    background-color: white;
    padding-top: 12px;
`

class ChooseAccountScreen extends withNav(Component) {
    componentDidMount() {
        this.changeHeader('Выбрать аккаунт')
        this.props.loadAccounts()
    }

    renderCompany = company => {
        return (
            <TableRow key={company.id} hover onClick={this.onRowSelection(company)}>
                <TableCell>{company.id}</TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{moment(company.createdAt).format('ll')}</TableCell>
            </TableRow>
        )
    }

    onAccountSave = accountObj => {
        console.log(accountObj)
        this.props.newAccount(accountObj).then(() => {
            this.props.loadAccounts()
        })
        this.modal.hide()
    }

    floatingButtonClicked = () => {
        this.modal.show()
    }

    onRowSelection = company => () => {
        if (company == undefined) return
        this.props.chooseAccount(company.permalink)
        this.props.history.push('/admin')
    }

    render() {
        return (
            <Container>
                <Card marginTop={12}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Идентификатор</TableCell>
                                <TableCell>Название</TableCell>
                                <TableCell>Создано</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{this.props.accounts.map(this.renderCompany)}</TableBody>
                    </Table>
                </Card>
                <Fab style={styles.fabStyle} onClick={this.floatingButtonClicked}>
                    <Icon>add</Icon>
                </Fab>
                <Modal ref={ref => (this.modal = ref)}>
                    <CreateAccount onAccountSave={this.onAccountSave} />
                </Modal>
            </Container>
        )
    }
}

const styles = {
    fabStyle: {
        position: 'fixed',
        right: 16,
        bottom: 16
    }
}

const enhance = compose(withProviders(AccountsProvider, NavigationProvider))

export default enhance(ChooseAccountScreen)
