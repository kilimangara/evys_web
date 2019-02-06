import {loadThemes, createTheme, changeTheme, loadTheory, addTheoryVideo} from '../../reducers/admin/themes'

export default superclass =>
    class ThemesRepository extends superclass {
        //Здесь методы для работы с данными из компонента


    }

export class ThemesProvider {
    static mapStateToProps = state => ({

    })

    static mapDispatchToProps = {
        loadThemes,
        loadTheme,
        createTheme ,
        changeTheme,
        addTheoryVideo
    }
}
