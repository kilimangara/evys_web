import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadProfileData, saveProfile } from '../actions/AccountActions'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import { Card } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import _ from 'lodash'
import { blue500 } from 'material-ui/styles/colors'
import { AliasTextField } from '../components/common/AliasTextfield'
import { ProfileContainer } from '../components/styled/profile'
import { CenteredContent, ColoredButton } from '../components/styled/common'
import { studentTheme } from '../utils/global_theme'
import {ImageLoader} from "../components/common/ImageLoader";

const profileFields = ['full_name', 'email', 'address']

const requiredFields = ['full_name', 'email']

class ProfileScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {},
            open: false
        }
    }

    componentWillMount() {
        if (!this.props.isAuthenticated) this.props.history.push('/app/login')
        this.props.loadProfileData()
    }

    retrieveValue = (name, defaulVal) => this.state[name] || defaulVal

    checkForErrors = () => {
        const errors = {}
        requiredFields.forEach(el => {
            if (!this.state[el]) errors[el] = 'Это поле обязательное'
        })
        this.setState({ errors })
        return !_.keys(errors).length
    }

    saveProfile = () => {
        if (!this.checkForErrors()) return
        const profile = _.pick(this.state, profileFields)
        this.props.saveProfile(profile).then(res => this.setState({ open: true }))
    }

    handleRequestClose = () => {
        this.setState({
            open: false
        })
    }

    onTextChanged(field, event) {
        const newErrors = _.omit(this.state.errors, [field])
        this.setState({
            errors: newErrors,
            [field]: event.target.value
        })
    }

    telegramLink = () => {
        const { userId } = this.props
        let res = `https://telegram.me/evys_bot?start=${userId}`
        if (__DEV__) res = `https://telegram.me/evys_dev_bot?start=${userId}`
        return res
    }

    render() {
        const { profileData, userId } = this.props
        const { errors } = this.state
        return (
            <CenteredContent style={{ height: '100%' }}>
                <ProfileContainer>
                    <ImageLoader width={'33%'} paddingTop={'33%'}/>
                    <AliasTextField alias={'ФИО'} />
                    <AliasTextField alias={'E-mail'} />
                    <ColoredButton color={studentTheme.ACCENT} textColor={studentTheme.BACKGROUND} style={{marginTop: '10px'}}>
                        сохранить
                    </ColoredButton>
                </ProfileContainer>
            </CenteredContent>
        )
    }
}

const mapStateToProps = state => ({
    profileData: state.account.profileData,
    isAuthenticated: state.auth.authenticated,
    userId: state.auth.user_id
})

export default connect(
    mapStateToProps,
    { loadProfileData, saveProfile }
)(ProfileScreen)
