import React, { Component } from 'react'
import {VictoryChart, VictoryScatter, VictoryVoronoiContainer, VictoryLine,
        VictoryAxis, VictoryContainer, VictoryTooltip, VictoryGroup} from 'victory'
import {loadStats, loadActions, loadRepeats} from '../actions/StatsActions'
import moment from 'moment'
import {blue500} from 'material-ui/styles/colors';
import { connect } from 'react-redux'
import {List, ListItem} from 'material-ui/List';
import {Card} from 'material-ui/Card';

class DashboardScreen extends Component {

  componentWillMount(){
    this.props.loadStats()
    this.props.loadRepeats()
    this.props.loadActions()
  }

  chartContainer(){
    return(
      <VictoryVoronoiContainer
        voronoiDimension="x"
        labels={(d) => `y: ${d.y}`}
        labelComponent={
          <VictoryTooltip
            cornerRadius={0}
            flyoutStyle={{ fill: "white" }}
          />}
      />
    )
  }

  renderRepeat = (repeat, index) => {
    return(
      <Card>
        <ListItem key={index} primaryText={`Тема: ${repeat.test_block.theme.name}`}
        secondaryText={`Начало прохождения ${moment(repeat.created_at).format('ll')}`}
        secondaryTextLines={1}/>
      </Card>
    )
  }

  getColorByPercent(percent){
    if(percent > 0) return 'green'
    if(percent < 0) return 'red'
    return 'gray'
  }

  getFormatText(percent){
    const color = this.getColorByPercent(percent)
    const percentForm = parseInt(percent)
    if(percent > 0) return (
      <p style={{fontSize: 14, color: 'black'}}>
          Ваш результат улучшился на <span style={{fontSize:18, color}}>{percentForm}%</span>
      </p>)
    if(percent < 0)  return (
      <p style={{fontSize: 14, color: 'black'}}>
          Ваш результат ухудшился на <span style={{fontSize:18, color}}>{-percentForm}%</span>
      </p>)
    return (
      <p style={{fontSize: 14, color: 'black'}}>
          Ваш результат не изменился
      </p>)
  }

  render(){
    const {chart_stats=[], percent_stats={}} = this.props.stats
    return(
      <div style={styles.containerStyle}>
        <div style={styles.innerContainer}>
          <div style={{display:'flex', justifyContent:'center'}}>
          <VictoryChart
             responsive domainPadding={10} animate>
            <VictoryAxis
               scale='time'
               style={{
                  ticks: {stroke: 'gray', size: 5},
                  axis: {stroke: 'gray'},
                  tickLabels: {fontSize: 10, padding: 5}
                }}
               label={'Дата(Время)'}
               tickCount={chart_stats.length}
               tickFormat={
                 (x) => moment(x.getTime()).format('DD-MM(HH:mm)')
               }/>
             <VictoryAxis dependentAxis
               label={'Среднее время выполнения'}
               style={{
                  ticks: {stroke: "rgba(0,0,0,0.2)", size: 5},
                  axis:{stroke:'transparent'},
                  grid: {stroke: 'rgba(0,0,0,0.2)'},
                  tickLabels: {fontSize: 10, padding: 5}
                }}/>
            <VictoryGroup>
              <VictoryScatter
                  data={chart_stats}
                  x={(d) => new Date(d[0])}
                  y={1}
                  style={{
                    data: {fill: blue500}
                  }}
                  size={(d, active) => active ? 6 : 4}/>
              <VictoryLine
                  data={chart_stats}
                  style={{
                      data:{strokeWidth: 2, stroke:blue500}
                   }}
                  interpolation='monotoneX'
                  x={(d) => new Date(d[0])}
                  y={1}/>
            </VictoryGroup>
          </VictoryChart>
          <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <span >Среднее время выполнения {percent_stats.average} с.</span>
            {this.getFormatText(percent_stats.percent)}
          </div>
          </div>
        </div>
        <div>
          <h2 style={{textAlign:'center'}}>Последние повторения</h2>
          <List>
            {this.props.repeats.map(this.renderRepeat)}
          </List>
        </div>
      </div>
    )
  }
}

const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    padding: 16,
    alignItems: 'center'
  },
  innerContainer: {
    justifyContent:'center',
    alignItems: 'center',
    display:'flex',
    alignSelf:'stretch'
  }
}

const mapStateToProps = state => ({
  stats: state.stats.chartStats || {},
  repeats: state.stats.lastRepeats,
  suggestions: state.stats.suggestions
})

const mapDispatchToProps = {
  loadStats,
  loadActions,
  loadRepeats
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)
