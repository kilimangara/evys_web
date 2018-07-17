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
        <div style={styles.statusLine}>
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
        height: '130px'
    },
    status: {
        position: 'relative',
        fontSize: '30px',
        float: 'right',
        color: 'blue',
        fontWeight: 'bold'
    },
    statusLine: {
        backgroundColor: 'blue',
        height: '18px',
        borderRadius: '0 0 0px 6px',
        marginTop: '72px',
        marginLeft: '-17px',
        width: '110px'
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
