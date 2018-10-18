import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCompanies, chooseCompany, createCompany } from '../../actions/admin/AccountActions'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { grey500, grey200, grey900, blue500 } from 'material-ui/styles/colors'
import moment from 'moment'
import Modal from 'reboron/ScaleModal'
import CreateAccount from '../../components/accounts/CreateAccount'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

class ChooseAccountScreen extends Component {
    componentWillMount() {
        this.props.loadCompanies()
    }

    renderCompany = company => {
        return (
            <TableRow key={company.id}>
                <TableRowColumn>{company.id}</TableRowColumn>
                <TableRowColumn>{company.name}</TableRowColumn>
                <TableRowColumn>{moment(company.created_at).format('ll')}</TableRowColumn>
            </TableRow>
        )
    }

    onAccountSave = accountObj => {
        this.props.createCompany(accountObj).then(() => {
            this.props.loadCompanies()
        })
        this.modal.hide()
    }

    floatingButtonClicked = () => {
        this.modal.show()
    }

    onRowSelection = selectedRow => {
        const companyIndex = selectedRow[0]
        if (companyIndex == undefined) return
        this.props.chooseCompany(this.props.companies[companyIndex].permalink)
        this.props.history.push('/admin')
    }

    render() {
        return (
            <div style={styles.container}>
                <Table selectable={true} onRowSelection={this.onRowSelection}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Идентификатор</TableHeaderColumn>
                            <TableHeaderColumn>Название</TableHeaderColumn>
                            <TableHeaderColumn>Создано</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover>
                        {this.props.companies.map(this.renderCompany)}
                    </TableBody>
                </Table>
                <FloatingActionButton
                    style={styles.fabStyle}
                    backgroundColor={grey900}
                    onClick={this.floatingButtonClicked}
                >
                    <ContentAdd />
                </FloatingActionButton>
                <Modal ref={ref => (this.modal = ref)}>
                    <CreateAccount onAccountSave={this.onAccountSave} />
                </Modal>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px'
    },
    fabStyle: {
        position: 'fixed',
        right: 16,
        bottom: 16
    }
}

const mapStateToProps = state => ({
    companies: state.company_admin.companyList,
    currentCompany: state.company_admin.currentCompany
})

export default connect(
    mapStateToProps,
    { chooseCompany, loadCompanies, createCompany }
)(ChooseAccountScreen)
