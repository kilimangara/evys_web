import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

class ThemesItem extends Component {

  state = {
    hover: false,
    borderDisplay: '0',
    statusDisplay: 'none'
  }

  changeHovered = (hover) => {
    this.setState({ hover })
  }


  render() {
    const { hover } = this.state
    const { name, percent, doneNumber, number, classes } = this.props
    let borderDisplay = '0', statusDisplay = 'none'

    if (this.props.percent == 100) { borderDisplay = '16' } else { statusDisplay = 'inline' }

    return (
      <Paper elevation={hover ? 5 : 1}
        className={classes.container}
        onMouseOver={this.changeHovered.bind(this, true)}
        onMouseOut={this.changeHovered.bind(this, false)}>
        <div style={{ border: `${borderDisplay}px solid #6AD9FD`, borderImage: 'linear-gradient(to right, #6AD9FD 0%, #1EABF1 100%)', margin: '-17px', borderImageSlice: 1, padding: '17px' }}>
          <p style={{ fontWeight: 'bold', margin: '0px' }}>{this.props.name}</p>
          {this.props.nastedThemes && <div> <p style={{ margin: '0px' }}>Кол-во разделов: <span style={{ fontWeight: 'bold' }}><span style={{ fontWeight: 'bold' }}>{this.props.number}</span></span></p>
            <p style={{ margin: '0px' }}>Выполнено: <span style={inlineStyles.number}>{this.props.doneNumber}</span> из <span style={{ fontWeight: 'bold' }}>{this.props.number}</span></p>
          </div>
          }
          <p style={inlineStyles.status}> {this.props.percent}% </p>
          <div style={{ display: `${statusDisplay}`, background: 'linear-gradient(to left, #1EABF1, #6AD9FD )', height: '16px', borderRadius: '0 0 0px 6px', left: '0px', position: 'absolute', bottom: '0px', width: `${this.props.percent}%` }}>
          </div>
        </div>
      </Paper>
    )
  }

}

const inlineStyles = {
  status: {
    margin: '0px',
    fontSize: '30px',
    color: '#6AD9FD',
    marginLeft: '70%',
    fontWeight: 'bold'
  },
  number: {
    fontWeight: 'bold',
    color: '#6AD9FD'
  }
}

const styles = theme => ({
  container: {
    borderRadius: '8px',
    overflow: 'hidden',
    padding: '16px',
    marginBottom: '10px',
    position: 'relative',
    '&:hover': {
      bottom: 5,
      transition: theme.transitions.create(['bottom'])
    }
  }
})

ThemesItem.defaultProps = {
  name: 'Основы',
  percent: 100,
  number: 5,
  doneNumber: 4,
  nastedThemes: true
}

export default withStyles(styles)(ThemesItem)
