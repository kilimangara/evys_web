import React, { Component } from 'react'
import _ from 'lodash'
import { AliasTextField } from '../components/common/AliasTextfield'
import { ProfileContainer } from '../components/styled/profile'
import { CenteredContent, ColoredButton, Error } from '../components/styled/common'
import { studentTheme } from '../utils/global_theme'
import { ImageLoader } from '../components/common/ImageLoader'
import { FavoriteSubjects } from '../components/subjects/favoriteSubjects/FavoriteSubjects'
import { subjects } from '../utils/subjects'
import withProviders from '../utils/withProviders'
import { AuthorizationProvider } from '../mixins/student/AuthorizationRepository'
import AccountMixin, { AccountProvider } from '../mixins/student/AccountRepository'

export const DEFAULT_AVATAR_IMAGE_URL = 'https://272507.selcdn.ru/evys_api_videos/evys/evys_avatar_placeholder.jpg'

const profileFields = ['full_name', 'email', 'avatar']

const requiredFields = ['full_name', 'email']

class ProfileScreen extends AccountMixin(Component) {
    state = {
        errors: {},
        open: false,
        selectedFavoriteSubjects: [],
        favoriteSubjectsOpened: this.props.isNew
    }

    componentWillMount() {
        if (!this.props.token) this.props.history.push('/login')
        this.props.loadProfileData().then(() =>
            this.setState({
                full_name: this.props.profileData.fullName,
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

    saveFavoriteSubjects = () => {
        this.props.saveProfile({ tags: this.state.selectedFavoriteSubjects })
        this.setState({ favoriteSubjectsOpened: false })
    }

    closeFavoriteSubjects = () => {
        this.setState({ favoriteSubjectsOpened: false })
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
        this.setState({ avatar })
    }

    handleFavoriteSubjectSelect = subject => {
        if (this.state.selectedFavoriteSubjects.includes(subject.alias)) {
            this.setState({
                selectedFavoriteSubjects: this.state.selectedFavoriteSubjects.filter(sub => sub !== subject.alias)
            })
        } else {
            this.setState({ selectedFavoriteSubjects: [...this.state.selectedFavoriteSubjects, subject.alias] })
        }
    }

    telegramLink = () => {
        const { userId } = this.props
        let res = `https://telegram.me/evys_bot?start=${userId}`
        if (__DEV__) res = `https://telegram.me/evys_dev_bot?start=${userId}`
        return res
    }

    render() {
        const { profileData, loading } = this.props
        const { errors, full_name, email, selectedFavoriteSubjects, favoriteSubjectsOpened } = this.state

        return (
            <CenteredContent style={{ height: 'fitContent' }}>
                {favoriteSubjectsOpened ? (
                    <FavoriteSubjects
                        subjects={subjects}
                        selected={selectedFavoriteSubjects}
                        onSelect={this.handleFavoriteSubjectSelect}
                        onApply={this.saveFavoriteSubjects}
                        onCancel={this.closeFavoriteSubjects}
                    />
                ) : (
                    <ProfileContainer>
                        <ImageLoader
                            width={'33%'}
                            paddingTop={'33%'}
                            loading={loading}
                            src={(profileData.avatar && profileData.avatar.original.url) || DEFAULT_AVATAR_IMAGE_URL}
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
                )}
            </CenteredContent>
        )
    }
}

export default withProviders(AuthorizationProvider, AccountProvider)(ProfileScreen)
