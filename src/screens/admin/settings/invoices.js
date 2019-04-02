import React from 'react'
import withNav, { NavigationProvider } from '../../../mixins/admin/NavigatableComponent'
import styled from 'styled-components'
import ReactPaginate from 'react-paginate'
import LinearProgress from '@material-ui/core/LinearProgress'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import { getInvoices } from '../../../api'
import { Card } from './index'
import produce from 'immer'
import moment from 'moment'
import { theme } from '../../../utils/global_theme'
import withProviders from '../../../utils/withProviders'

const Container = styled.div`
    display: flex;
    margin-top: 12px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
`

const ColoredButton = styled(Button)`
    background-color: ${theme.ACCENT_COLOR};
    color: white;
`

class InvoicesScreen extends withNav(React.Component) {
    state = {
        invoices: null,
        currentPage: 0,
        totalPages: 1
    }

    componentDidMount() {
        this.loadInvoices()
        this.changeHeader('Счета')
    }

    onPageChanged = page => {
        this.loadInvoices(page.selected + 1)
    }

    loadInvoices(page = 1) {
        getInvoices({ page }).then(({ data }) => {
            this.setState(
                produce(this.state, draft => {
                    draft.invoices = data.results
                    draft.currentPage = page
                    draft.totalPages = data.count
                })
            )
        })
    }

    renderInvoice = (invoice, index) => {
        return (
            <TableRow key={invoice.id}>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>{invoice.description}</TableCell>
                <TableCell>{moment(invoice.createdAt).format('ll')}</TableCell>
                <TableCell>
                    {!invoice.paid && (
                        <ColoredButton target="_blank" href={invoice.paymentUrl}>
                            Оплатить
                        </ColoredButton>
                    )}
                </TableCell>
            </TableRow>
        )
    }

    render() {
        const { currentPage, invoices, totalPages } = this.state
        if (!invoices)
            return (
                <div>
                    <LinearProgress />
                </div>
            )
        return (
            <Container>
                <Card>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Cчет</TableCell>
                                <TableCell>Назначение</TableCell>
                                <TableCell>Создан</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>{invoices.map(this.renderInvoice)}</TableBody>
                    </Table>
                </Card>
                <div style={{ alignSelf: 'center' }}>
                    <ReactPaginate
                        disableInitialCallback
                        style={{ marginTop: 12, alignSelf: 'center' }}
                        pageCount={totalPages}
                        initialPage={0}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={this.onPageChanged}
                        previousLabel="<<"
                        nextLabel=">>"
                        containerClassName={'pagination'}
                    />
                </div>
            </Container>
        )
    }
}

export default withProviders(NavigationProvider)(InvoicesScreen)
