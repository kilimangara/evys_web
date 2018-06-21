import React, {Component} from 'react'
import {loadTariffs, subscribeTariff} from '../actions/TariffActions'
import {connect } from 'react-redux'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from "material-ui/RaisedButton"
import {GridList, GridTile} from 'material-ui/GridList'
import Snackbar from 'material-ui/Snackbar'
import Divider from 'material-ui/Divider'
import {withGetScreen} from 'react-getscreen'
import {blue500} from 'material-ui/styles/colors'

class TariffsScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      openSnack: false
    }
  }

  componentWillMount(){
    this.props.loadTariffs('free')
  }

  subscribeToTariff = (tariff) => {
    this.props.subscribeTariff(tariff.id)
              .then(res => {
                this.props.loadTariffs('free')
                this.setState({openSnack: true})
              })

  }

  handleRequestClose = () => {
     this.setState({
       openSnack: false,
     })
  }

  subjectText(subject, index){
    const comma = this.length !== index + 1
    return (
      <span key={index} style={styles.boldText}>{subject.subject}{comma ? ', ' : ''}</span>
    )
  }

  renderTariff = (tariff, index) => {
    return (
      <Card key={index} style={styles.cardContainer}>
        <CardHeader
           title={tariff.name}
           subtitle="Описание"
           actAsExpander={true}
           showExpandableButton={true}/>
         <Divider/>
         <CardText expandable={true}>
            {tariff.description}
         </CardText>
         <Divider/>
         <CardText>
            Включает в себя следющие предметы:
            {tariff.subjects.map(this.subjectText.bind({length: tariff.subjects.length}))}
         </CardText>
         {tariff.has_subject.length && (
           <CardText>
            Вы уже подписаны на похожие курсы:
            {tariff.has_subject.map(this.subjectText.bind({length: tariff.has_subject.length}))}
         </CardText>)}
        <CardActions>
            <RaisedButton backgroundColor={blue500}
                          labelColor={'white'}
                          onClick={this.subscribeToTariff.bind(this, tariff)}
                          label={'Записаться бесплатно'}
                          style={{borderRadius:'20px'}}/>
        </CardActions>
      </Card>
    )
  }

  render(){
    let numberOfColumns = 2
    if(this.props.tariffs.length === 1 || this.props.isMobile()) numberOfColumns = 1
    return(
      <div style={styles.container}>
        <GridList padding={50} cellHeight={'auto'} cols={numberOfColumns}>
          {this.props.tariffs.map(this.renderTariff)}
        </GridList>
        <Snackbar
           open={this.state.openSnack}
           message="Подписка оформлена"
           autoHideDuration={2000}
           onRequestClose={this.handleRequestClose}
         />
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
    padding: 8,
  },
  boldText: {
    fontSize: 14
  }
}

const mapStateToProps = state => ({
  tariffs: state.tariffs.tariffList || [],
  authenticated: state.auth.authenticated
})

export default connect(mapStateToProps, {loadTariffs, subscribeTariff})(withGetScreen(TariffsScreen))
