import {
    loadThemes,
    loadTheme,
    createTheme,
    changeTheme,
    removeTheme,
    loadTheory,
    addTheoryVideo,
    resetThemesList,
    saveTheory
} from '../../reducers/admin/themes'

export default superclass =>
    class ThemesRepository extends superclass {
        //Здесь методы для работы с данными из компонента

        getTheme = () => {
            const id = this.themeId()
            return this.props.loadTheme(id)
        }

        getTheory = () => {
            const id = this.themeId()
            return this.props.loadTheory(id).then(data => {
                this.setState(data)
            })
        }

        updateTheme = () => {
            const { theme } = this.state
            return this.props.changeTheme(this.themeId(), theme)
        }

        noThemes = () => {
            return !this.props.themes.length && !this.themesFetching && !this.parentId()
        }

        subjectId = () => this.props.match.params['subjectId']

        themeId = () => this.props.match.params['themeId']

        parentId = () => {
            const paramsStr = this.props.location.search
            const params = new URLSearchParams(paramsStr)
            return params.get('parent')
        }
    }

export class ThemeProvider {
    static mapStateToProps = state => ({
        themes: state.themes.list,
        themesFetching: state.themes.fetching,
        theme: state.themes.current
    })

    static mapDispatchToProps = {
        loadThemes,
        loadTheme,
        createTheme,
        changeTheme,
        addTheoryVideo,
        changeTheme,
        deleteTheme: removeTheme,
        loadTheory,
        resetThemesList,
        saveTheory
    }
}
