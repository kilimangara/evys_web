import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from "material-ui/RaisedButton"
import {grey900} from 'material-ui/styles/colors'
import bind from 'memoize-bind'

export default class StudentCreation extends Component {

  constructor(props){
    super(props)
    this.state = this.props.initialState
  }

  textFieldChanged = (field, event, newValue) => {
    this.setState({
      [field]: newValue
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.initialState)
  }

  render(){
    return (
      <div style={styles.container}>
        <TextField onChange={bind(this.textFieldChanged, this, 'phone')}
          hintText="Телефон*" value={this.state.phone}
          underlineFocusStyle={{borderColor: grey900}} />
        <TextField onChange={bind(this.textFieldChanged, this, 'full_name')}
          hintText="Имя*" value={this.state.full_name}
          underlineFocusStyle={{borderColor: grey900}} />
        <TextField onChange={bind(this.textFieldChanged, this, 'email')}
          hintText="Почта*" value={this.state.email}
          underlineFocusStyle={{borderColor: grey900}} />
        <RaisedButton label="Сохранить"
          labelStyle={{color: 'white'}}
          backgroundColor={grey900}
          onClick={this.props.onStudentSave.bind(this, this.state)}/>
        {this.props.updateMode && (
          <RaisedButton label="Удалить"
            style={{marginTop:20}}
            labelStyle={{color: 'white'}}
            backgroundColor={grey900}
            onClick={this.props.onStudentDelete.bind(this, this.state.id)}/>
          )}
      </div>
    )
  }
}

StudentCreation.defaultProps = {
  onStudentSave: (data) => {},
  onStudentDelete:(id) => {},
  updateMode: false,
  initialState: {phone:'+7', full_name:'', email: ''}
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 36
  }
}
