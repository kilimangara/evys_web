import React, { Component } from 'react'
import { loadTariffs, createTariff, updateTariff, deleteTariff } from '../../actions/admin/TariffActions'
import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { GridList, GridTile } from 'material-ui/GridList'
import { withGetScreen } from 'react-getscreen'
import { grey900 } from 'material-ui/styles/colors'
import ReactPaginate from 'react-paginate'
import '../../screencss/PaginateCss.scss'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Modal from 'reboron/ScaleModal'
import CreateTariff from '../../components/tariffs/CreateTariff'
import Divider from 'material-ui/Divider'
import bind from 'memoize-bind'

class TariffScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            selectedTariff: undefined
        }
    }

    componentWillMount() {
        this.props.loadTariffs(this.state.currentPage)
    }

    subscribeToTariff = tariff => {
        this.props.history.push(`/admin/students?tariff_id=${tariff.id}`)
    }

    floatingButtonClicked = () => {
        this.modal.show()
    }

    onPageChanged = page => {
        if (page === 0) return
        this.setState({ currentPage: page.selected })
        this.props.loadTariffs(page.selected)
    }

    saveTariff = tariffObj => {
        this.props.createTariff(tariffObj).then(() => {
            this.props.loadTariffs(this.state.currentPage)
        })
        this.modal.hide()
    }

    updateTariff = tariffObj => {
        this.props.updateTariff(tariffObj.id, tariffObj).then(() => {
            this.props.loadTariffs(this.state.currentPage)
        })
        this.modalUpdate.hide()
    }

    updateClick = tariff => {
        this.setState({ selectedTariff: tariff })
        this.modalUpdate.show()
    }

    clickDeleteTariff = tariff => {
        this.props.deleteTariff(tariff.id).then(() => {
            this.props.loadTariffs(this.props.currentPage)
        })
    }

    renderTariff = (tariff, index) => {
        return (
            <Card key={index} style={styles.cardContainer}>
                <CardHeader title={tariff.name} subtitle="Описание" actAsExpander={true} showExpandableButton={true} />
                <Divider />
                <CardText expandable={true}>{tariff.description}</CardText>
                <Divider />
                <CardActions>
                    <RaisedButton
                        onClick={bind(this.subscribeToTariff, this, tariff)}
                        backgroundColor={grey900}
                        label={'Записать учеников'}
                        labelStyle={{ color: 'white' }}
                        style={{ borderRadius: '20px' }}
                    />
                    <RaisedButton
                        onClick={bind(this.updateClick, this, tariff)}
                        backgroundColor={grey900}
                        label={'Редактировать'}
                        labelStyle={{ color: 'white' }}
                        style={{ borderRadius: '20px', marginTop: 12 }}
                    />
                    <RaisedButton
                        onClick={bind(this.clickDeleteTariff, this, tariff)}
                        backgroundColor={grey900}
                        label={'Удалить'}
                        labelStyle={{ color: 'white' }}
                        style={{ borderRadius: '20px', marginTop: 12 }}
                    />
                </CardActions>
            </Card>
        )
    }

    render() {
        let numberOfColumns = 2
        if (this.props.tariffs.length === 1 || this.props.isMobile()) numberOfColumns = 1
        return (
            <div style={styles.container}>
                <GridList padding={25} cellHeight={'auto'} cols={numberOfColumns}>
                    {this.props.tariffs.map(this.renderTariff)}
                </GridList>
                <ReactPaginate
                    style={{ marginTop: 12 }}
                    disableInitialCallback
                    pageCount={this.props.totalPages}
                    initialPage={this.state.currentPage}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={4}
                    onPageChange={this.onPageChanged}
                    previousLabel="<<"
                    nextLabel=">>"
                    containerClassName={'pagination'}
                />
                <FloatingActionButton
                    style={styles.fabStyle}
                    backgroundColor={grey900}
                    onClick={this.floatingButtonClicked}
                >
                    <ContentAdd />
                </FloatingActionButton>
                <Modal ref={ref => (this.modal = ref)}>
                    <CreateTariff onTariffSave={this.saveTariff} />
                </Modal>
                <Modal ref={ref => (this.modalUpdate = ref)}>
                    <CreateTariff initialState={this.state.selectedTariff} onTariffSave={this.updateTariff} />
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
        padding: 16
    },
    cardContainer: {
        padding: 8
    },
    boldText: {
        fontSize: 14
    },
    fabStyle: {
        position: 'fixed',
        right: 16,
        bottom: 16
    }
}

const mapStateToProps = state => ({
    tariffs: state.tariffs_admin.tariffList,
    totalPages: state.tariffs_admin.totalPages
})

export default connect(
    mapStateToProps,
    { loadTariffs, createTariff, updateTariff, deleteTariff }
)(withGetScreen(TariffScreen))
