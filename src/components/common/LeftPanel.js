import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import classNames from 'classnames';
import Button from '@material-ui/core/Button'

class LeftPanel extends Component {

  activeButton(index){
    switch(index){
      case 0:
        return {chart: true}
      case 1:
        return {graduation: true}
      case 2:
        return {accounts: true}
      case 3:
        return {user: true}
      default:
        return {graduation: true}
    }
  }

  render(){
    const {classes, buttonIndexActive} = this.props
    const active = this.activeButton(buttonIndexActive)
    return(
      <Paper elevation={1} className={classes.root}>
        <div className={classes.logosContainer}>
          <img src='/images/evysHeaderLogo.png' className={classes.logoStyle}/>
          <button className={classNames(classes.buttonStyle, {[classes.activeButtonStyle]: active.chart})}>
            <Icon className={classNames('far fa-chart-bar',
                                        classes.icon,
                                        {[classes.activeIcon]: active.chart})}/>
          </button>
          <button className={classNames(classes.buttonStyle, {[classes.activeButtonStyle]: active.graduation})}>
            <Icon className={classNames('fas fa-graduation-cap', classes.icon, {[classes.activeIcon]: active.graduation})}/>
          </button>
          <button className={classNames(classes.buttonStyle, {[classes.activeButtonStyle]: active.accounts})}>
            <Icon className={classNames('fas fa-book', classes.icon, {[classes.activeIcon]: active.accounts})}/>
          </button>
        </div>
        <button className={classNames(classes.buttonStyle, {[classes.activeButtonStyle]: active.user})}>
          <Icon className={classNames('far fa-user', classes.icon, {[classes.activeIcon]: active.user})}/>
        </button>
      </Paper>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 64,
    backgroundColor: '#455a64',
    alignItems:'stretch',
    borderRadius: 0
  },
  logoStyle: {
    width: 64,
    height: 64,
    marginBottom: 12
  },
  logosContainer: {
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'stretch',
    display: 'flex'
  },
  icon: {
    overflow: 'visible',
    color: '#cecece',
    width: 'inherit',
    fontSize: 36,
    '&:hover': {
      color: 'white',
      transition: theme.transitions.create(['color']),
    }
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    cursor: 'pointer',
    border: 0,
    padding: '6px 0px',
    display: 'flex',
    justifyContent:'center',
    '&:hover': {
      transition: theme.transitions.create(['background-color']),
      backgroundColor: '#1EAAF0'
    }
  },
  activeIcon: {
    color: 'white'
  },
  activeButtonStyle: {
    backgroundColor: '#1EAAF0'
  }
})

//#cecece

export default withStyles(styles)(LeftPanel)

LeftPanel.defaultProps = {
  currentMenu: 0
}
