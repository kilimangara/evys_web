import React, { Component } from 'react'
import {connect} from 'react-redux'
import {loadProfileData, saveProfile} from '../actions/AccountActions'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import {Card} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import _ from 'lodash'
import {blue500} from 'material-ui/styles/colors'

const profileFields = ['full_name', 'email', 'address']

const requiredFields = ['full_name', 'email']

class ProfileScreen extends Component{

  constructor(props){
    super(props)
    this.state = {
      errors:{},
      open: false
    }
  }

  componentWillMount(){
    if(!this.props.isAuthenticated) this.props.history.push('/app/login')
    this.props.loadProfileData()
  }

  retrieveValue = (name, defaulVal) => this.state[name] || defaulVal

  checkForErrors = () => {
    const errors = {}
    requiredFields.forEach( el => {
      if(!this.state[el]) errors[el] = 'Это поле обязательное'
    })
    this.setState({errors})
    return !_.keys(errors).length
  }

  saveProfile = () => {
    if(!this.checkForErrors()) return
    const profile = _.pick(this.state, profileFields)
    this.props.saveProfile(profile).then(res => this.setState({open: true}))
  }

  handleRequestClose = () => {
     this.setState({
       open: false,
     })
  }

  onTextChanged(field, event){
    const newErrors = _.omit(this.state.errors, [field])
    this.setState({
      errors:newErrors,
      [field]: event.target.value
    })
  }

  telegramLink = () => {
    const {userId} = this.props
    let res = `https://telegram.me/evys_bot?start=${userId}`
    if(__DEV__) res =  `https://telegram.me/evys_dev_bot?start=${userId}`
    return res
  }

  render(){
    const {profileData, userId} = this.props
    const {errors} = this.state
    return(
      <div style={styles.cardContainer}>
        <Card style={{padding:'24px', minWidth:'60%'}}>
          <div style={styles.cardContainer}>
          <TextField floatingLabelText='Полное имя *'
                     hintText='Введите полное имя'
                     errorText={errors.full_name}
                     floatingLabelFocusStyle={{color: blue500}}
                     underlineFocusStyle={{borderColor: blue500}}
                     onChange={this.onTextChanged.bind(this, 'full_name')}
                     value={this.retrieveValue('full_name', profileData.full_name)}/>
          <TextField floatingLabelText='E-mail *'
                     hintText='Введите E-mail'
                     underlineFocusStyle={{borderColor: blue500}}
                     floatingLabelFocusStyle={{color: blue500}}
                     errorText={errors.email}
                     onChange={this.onTextChanged.bind(this, 'email')}
                     value={this.retrieveValue('email', profileData.email)}/>
          <TextField floatingLabelText='Адрес'
                    hintText='Введите адрес'
                    floatingLabelFocusStyle={{color: blue500}}
                    underlineFocusStyle={{borderColor: blue500}}
                    onChange={this.onTextChanged.bind(this, 'address')}
                    value={this.retrieveValue('address', profileData.address)}/>
          </div>
        </Card>
        <br/>
        <RaisedButton backgroundColor={blue500} style={{width:'60%'}} label={'Сохранить'}
                      labelColor={'white'}
                      onClick={this.saveProfile}/>
        <RaisedButton backgroundColor={blue500} style={{marginTop:12, width:'60%'}}
                      labelColor={'white'}
                      label={'Перейти в телеграм бота'} href={this.telegramLink()}/>
        <div style={{display: 'inline-block', fontSize: '14px', color: '#333', width: '60%', marginTop: 12}}>
          Если ссылка не работает, то найдите нашего бота в телеграмме <span style={styles.botLinkStyle}>@evys_bot</span> и введите команду <br/>
          <pre style={styles.preStyle}>/start {userId}</pre>
        </div>
        <Snackbar
           open={this.state.open}
           message="Изменения сохранены"
           autoHideDuration={2000}
           onRequestClose={this.handleRequestClose}
         />
      </div>
    )
  }
}

const styles = {
  cardContainer: {
    flexDirection:'column',
    display:'flex',
    justifyContent: 'flex-end',
    alignItems:'center',
  },
  textStyle: {
    marginTop: 12,

  },
  botLinkStyle: {
    textDecoration: 'underline',
    color: '#23527c',
  },
  textFielStyle:{
    borderColor: blue500
  },
  preStyle: {
    padding: '9.5px',
    fontSize: '13px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    borderWidht: '4px'
  }
}

const mapStateToProps = state => ({
  profileData: state.account.profileData,
  isAuthenticated: state.auth.authenticated,
  userId: state.auth.user_id
})

export default connect(mapStateToProps, {loadProfileData, saveProfile})(ProfileScreen)
