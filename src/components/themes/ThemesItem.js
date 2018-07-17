import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

class ThemesItem extends Component {

    state = {
        hover: false
      }
    
      changeHovered = (hover) => {
        this.setState({hover})
      }
    

  render(){
    const {hover} = this.state
    const {name, percent, doneNumber, number, classes} = this.props

    return(
        <Paper elevation={hover ? 5 : 1}
        className={classes.container}
        onMouseOver={this.changeHovered.bind(this, true)}
        onMouseOut={this.changeHovered.bind(this, false)}>
        <p style={{ fontWeight: 'bold', margin: '0px' }}>{this.props.name}</p>
        <p style={{ margin: '0px' }}>Кол-во разделов: <span style={{ fontWeight: 'bold' }}><span style={{ fontWeight: 'bold' }}>{this.props.number}</span></span></p>
        <p style={{ margin: '0px' }}>Выполнено: <span style={inlineStyles.number}>{this.props.doneNumber}</span> из <span style={{ fontWeight: 'bold' }}>{this.props.number}</span></p>
        <p style={inlineStyles.status}> {this.props.percent}% </p>
        <div style={inlineStyles.statusLine} style={{ width: `${this.props.percent}%`, 
        background: 'linear-gradient(to left, #00BFFF, #fefcea)',
        height: '16px',
        borderRadius: '0 0 0px 6px',
        left: '0px',
        position: 'absolute',
        bottom: '0px'}}>
            </div>
    </Paper>
    )
  }

}

const inlineStyles = {
    theme: {
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        padding: '17px',
        borderRadius: '6px',
        marginBottom: '10px',
        position: 'relative',
     //   border: '16px solid #00BFFF'
    },
    status: {
        margin: '0px',
        fontSize: '30px',
        color: '#00BFFF',
        marginLeft: '70%',
        fontWeight: 'bold'
    },
    number: {
        fontWeight: 'bold', 
        color: 'blue'
    }
}

const styles = theme => ({
    container: {
      borderRadius: 8,
      overflow: 'hidden',
      padding: '17px',
      marginBottom: '10px',
      position:'relative',
      '&:hover': {
        bottom: 5,
        transition: theme.transitions.create(['bottom'])
      }
    }
  })

ThemesItem.defaultProps = {
  name: 'Основы',
  percent: 50,
  number: 5,
  doneNumber: 4
}

export default withStyles(styles)(ThemesItem)
