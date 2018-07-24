import React, { Component } from 'react'

class CourseHeader extends Component {

    

  render(){

    return(
        <div style={{ borderRadius: '6px',marginBottom: '80px',paddingTop: '100px', backgroundPosition: '30%', backgroundSize: 'cover', backgroundImage: `url(${this.props.url})`}}>
        <div style={styles.courseBottom}>
        {/* <div style={{display:'inline-block'}}>
        <Avatar style={{backgroundColor: 'orange', width: '55px', height: '55px', margin: '10px'}}> НЗ </Avatar>
        </div> */}
        {/* <div style={{display:'inline-block', color: 'white'}}>
        <p> Злакин Н.А. </p>
        </div> */}
        <div style={{display:'inline-block', color: 'white', marginLeft:'43%', marginTop:'18px'}}>
            <p>{this.props.name}</p>
            <p style={{fontSize:'11px', marginLeft:'17px', marginTop:'-10px'}}>до {this.props.date}</p>
        </div>
        <div style={{display:'inline-block', float:'right', marginTop:'44px', marginRight:'3px' , color: 'white'}}>
        <p>{this.props.percent}%</p>
            </div>
        </div>
    </div>
    )
  }

}

const styles = {
    courseBottom: {
        position: 'relative',
        backgroundColor: 'rgba(64, 64, 64, 0.7)',
        height: '80px',
        borderRadius: '0 0 6px 6px'
    }
}

CourseHeader.defaultProps = {
    url: 'https://respectbet.com/upload/articles/59d7a723718e7.jpg',
    name: 'Основы Python',
    percent: 15,
    date: '01.04.19'
  }
  

export default CourseHeader