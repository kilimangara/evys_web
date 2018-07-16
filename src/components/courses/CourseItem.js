import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'

class CourseItem extends Component {

  state = {
    hover: false
  }

  changeHovered = (hover) => {
    this.setState({hover})
  }

  render(){
    const {hover} = this.state
    const {active, name, percent, courseImage, classes, subscribeTo} = this.props
    return(
      <Paper elevation={hover ? 5 : 1}
             className={classes.container}
             onMouseOver={this.changeHovered.bind(this, true)}
             onMouseOut={this.changeHovered.bind(this, false)}>
        <div>
          <img src={courseImage} style={{maxWidth: '100%', maxHeight:'100%', objectContain: 'fill'}}/>
          <div className={classes.metaOverlay}>
            <div style={{backgroundColor:'#34BDF5', width:`${percent}%`, alignSelf:'flex-start' ,height: 6}}/>
            <div style={inlineStyles.dataStyle}>
              <span style={inlineStyles.mainText}>{name}</span>
              <span style={inlineStyles.mainText}>Без учителя</span>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <span style={inlineStyles.accentText}>до {moment(subscribeTo).format('D.MM.YY')}</span>
                <span style={inlineStyles.secondaryText}>{percent}%</span>
              </div>
            </div>
          </div>
          {!active && (
            <div className={classes.inactiveOverlay}>
              <span style={{color:'white', fontSize: 24}}>Подписка устарела</span>
            </div>
          )}
        </div>
      </Paper>
    )
  }

}

const inlineStyles = {
  dataStyle: {
    padding: 8,
    display:'flex',
    flexDirection: 'column'
  },
  mainText: {
    color: 'white',
    fontSize: 14
  },
  secondaryText: {
    color: 'white',
    fontSize: 14
  },
  accentText: {
    color: 'white',
    fontSize: 10
  }
}

const styles = theme => ({
  metaOverlay: {
    height: '45%',
    width: '100%',
    position:'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
    display: 'flex',
    flexDirection: 'column'
  },
  inactiveOverlay: {
    height: '100%',
    width: '100%',
    position:'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    bottom: 0,
    backgroundColor: 'rgba(128,128,128,.85)',
  },
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    display:'flex',
    position:'relative',
    '&:hover': {
      bottom: 5,
      transition: theme.transitions.create(['bottom'])
    }
  }
})

CourseItem.defaultProps = {
  active: true,
  name: 'Тест',
  percent: 50,
  teacherName: '',
  subscribeTo: '2018-07-18T20:59:59.999Z',
  courseImage: 'https://respectbet.com/upload/articles/59d7a723718e7.jpg'
}

export default withStyles(styles)(CourseItem)
