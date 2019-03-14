import React, { Component } from 'react'
import _ from 'lodash'
import { AliasTextField } from '../components/common/AliasTextfield'
import { ProfileContainer } from '../components/styled/profile'
import {
    CenteredContent,
    ColoredButton,
    ColumnFlexed,
    Error,
    FullPageOverlay,
    H2,
    HorizontalCentered,
    WithVerticalMargin
} from '../components/styled/common'
import { studentTheme } from '../utils/global_theme'
import { ImageLoader } from '../components/common/ImageLoader'
import { FavoriteSubjects } from '../components/subjects/favoriteSubjects/FavoriteSubjects'
import { subjects } from '../utils/subjects'
import withProviders from '../utils/withProviders'
import { AuthorizationProvider } from '../mixins/student/AuthorizationRepository'
import AccountMixin, { AccountProvider } from '../mixins/student/AccountRepository'
import { withSnackbar } from 'notistack'
import { shuffle } from '../utils/utilFunctions'

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
        const subjectsCopy = [...subjects]
        this.croppedRandomSubjects = shuffle(subjectsCopy).splice(0, 12)
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
        // if (!this.checkForErrors()) return
        const profile = _.pick(this.state, profileFields)
        this.props
            .saveProfile(profile)
            .then(res => {
                this.props.enqueueSnackbar('Профиль успешно сохранен', { variant: 'success' })
                this.setState({ open: true })
            })
            .catch(err => {
                this.props.enqueueSnackbar('При сохранении профиля произошла ошибка', { variant: 'error' })
            })
    }

    saveFavoriteSubjects = () => {
        this.props.saveProfile({ tags: this.state.selectedFavoriteSubjects.map(sub => sub.alias) })
        this.props.removeIsNew()
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
        if (!!this.state.selectedFavoriteSubjects.find(stateSubject => stateSubject.name === subject.name)) {
            this.setState({
                selectedFavoriteSubjects: this.state.selectedFavoriteSubjects.filter(sub => sub.name !== subject.name)
            })
        } else {
            this.setState({ selectedFavoriteSubjects: [...this.state.selectedFavoriteSubjects, subject] })
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
        console.log(selectedFavoriteSubjects)
        return (
            <CenteredContent style={{ height: 'fitContent' }}>
                {favoriteSubjectsOpened ? (
                    <FullPageOverlay>
                        <ColumnFlexed>
                            <HorizontalCentered>
                                <WithVerticalMargin margin={'24px'}>
                                    <H2>Выберите любимые темы</H2>
                                </WithVerticalMargin>
                            </HorizontalCentered>
                            <FavoriteSubjects
                                subjects={this.croppedRandomSubjects}
                                selected={selectedFavoriteSubjects}
                                onSelect={this.handleFavoriteSubjectSelect}
                                onApply={this.saveFavoriteSubjects}
                                onCancel={this.closeFavoriteSubjects}
                            />
                        </ColumnFlexed>
                    </FullPageOverlay>
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

export default withProviders(AuthorizationProvider, AccountProvider)(withSnackbar(ProfileScreen))
