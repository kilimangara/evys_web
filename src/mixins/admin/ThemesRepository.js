import {
  loadThemes,
  loadTheme,
  createTheme,
  changeTheme,
  removeTheme,
  loadTheory,
  addTheoryVideo,
} from '../../reducers/admin/themes'

export default superclass =>
    class ThemesRepository extends superclass {
        //Здесь методы для работы с данными из компонента

        getTheme = () => {
          const id = this.themeId()
          return this.props.loadTheme(id)
        }

        updateTheme = () => {
          const {theme} = this.state
          return this.props.changeTheme(this.themeId(), theme)
        }

        subjectId = () => this.props.match.params['subjectId']

        themeId = () => this.props.match.params['themeId']
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
        loadTheory
    }
}
