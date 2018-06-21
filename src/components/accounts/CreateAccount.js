import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from "material-ui/RaisedButton"
import {grey900} from 'material-ui/styles/colors'

export default class CreateAccount extends Component {

  constructor(props){
    super(props)
    this.state = this.props.initialState
  }

  textFieldChanged = (event, newValue) => {
    this.setState({
      name: newValue
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.initialState)
  }

  render(){
    return (
      <div style={styles.container}>
        <TextField onChange={this.textFieldChanged}
          hintText="Название" value={this.state.name}
          underlineFocusStyle={{borderColor: grey900}} />
        <RaisedButton label="Сохранить"
          labelStyle={{color: 'white'}}
          backgroundColor={grey900}
          onClick={this.props.onAccountSave.bind(this, this.state)}/>
        {this.props.updateMode && (
          <RaisedButton label="Удалить"
            style={{marginTop:20}}
            labelStyle={{color: 'white'}}
            backgroundColor={grey900}
            onClick={this.props.onAccountDelete.bind(this, this.state.id)}/>
          )}
      </div>
    )
  }
}

CreateAccount.defaultProps = {
  onAccountSave: (data) => {},
  onAccountDelete:(id) => {},
  updateMode: false,
  initialState: {name:''}
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
