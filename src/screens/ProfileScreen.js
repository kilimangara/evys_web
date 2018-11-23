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
import { CenteredContent, ColoredButton, Error } from '../components/styled/common'
import { studentTheme } from '../utils/global_theme'
import { ImageLoader } from '../components/common/ImageLoader'

const profileFields = ['full_name', 'email', 'avatar']

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
        this.props.loadProfileData().then(() =>
            this.setState({
                full_name: this.props.profileData.full_name,
                email: this.props.profileData.email,
                avatar: this.props.profileData.avatar
            })
        )
    }

    retrieveValue = (name, defaultVal) => this.state[name] || defaultVal

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

    onAvatarChanged = avatar => {
        console.log('ava', avatar)
        this.setState({ avatar })
    }

    telegramLink = () => {
        const { userId } = this.props
        let res = `https://telegram.me/evys_bot?start=${userId}`
        if (__DEV__) res = `https://telegram.me/evys_dev_bot?start=${userId}`
        return res
    }

    render() {
        const { profileData, userId, loading } = this.props
        const { errors, full_name, email } = this.state
        return (
            <CenteredContent style={{ height: '100%' }}>
                <ProfileContainer>
                    <ImageLoader
                        width={'33%'}
                        paddingTop={'33%'}
                        loading={loading}
                        src={profileData.avatar && profileData.avatar.medium.url}
                        onChange={this.onAvatarChanged}
                    />
                    <AliasTextField
                        fieldProps={{ value: full_name }}
                        onChange={this.onTextChanged.bind(this, 'full_name')}
                        alias={'ФИО'}
                    />
                    {errors.full_name && <Error>{errors.full_name}</Error>}
                    <AliasTextField
                        alias={'E-mail'}
                        fieldProps={{ value: email }}
                        onChange={this.onTextChanged.bind(this, 'email')}
                    />
                    {errors.full_name && <Error>{errors.email}</Error>}
                    <ColoredButton
                        color={studentTheme.ACCENT}
                        textColor={studentTheme.BACKGROUND}
                        style={{ marginTop: '10px' }}
                        onClick={this.saveProfile}
                    >
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
    userId: state.auth.user_id,
    loading: state.account.fetching
})

export default connect(
    mapStateToProps,
    { loadProfileData, saveProfile }
)(ProfileScreen)
