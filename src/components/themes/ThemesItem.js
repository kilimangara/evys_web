import React, { Component } from 'react'

class ThemesItem extends Component {

  render(){
    const {name, percent, doneNumber, number} = this.props

    return(
        <div style={styles.theme}>
        <p style={{ fontWeight: 'bold', margin: '0px' }}>{this.props.name}</p>
        <p style={{ margin: '0px' }}>Кол-во разделов: <span style={{ fontWeight: 'bold' }}><span style={{ fontWeight: 'bold' }}>{this.props.number}</span></span></p>
        <p style={{ margin: '0px' }}>Выполнено: <span style={styles.number}>{this.props.doneNumber}</span> из <span style={{ fontWeight: 'bold' }}>{this.props.number}</span></p>
        <p style={styles.status}> {this.props.percent}% </p>
        <div style={styles.statusLine} style={{ width: `${this.props.percent}%`, 
        backgroundColor: 'blue',
        height: '18px',
        borderRadius: '0 0 0px 6px',
        left: '0px',
        position: 'absolute',
        bottom: '0px'}}>
            </div>
    </div>
    )
  }

}

const styles = {
    theme: {
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        padding: '15px',
        borderRadius: '6px',
        marginBottom: '10px',
        position: 'relative'
    },
    status: {
        margin: '0px',
        fontSize: '30px',
        color: 'blue',
        marginLeft: '70%',
        fontWeight: 'bold'
    },
    number: {
        fontWeight: 'bold', 
        color: 'blue'
    }
}

ThemesItem.defaultProps = {
  name: 'Основы',
  percent: 50,
  number: 5,
  doneNumber: 4
}

export default ThemesItem
