import { getSearchSubjects, getAllSubjects, setSearch } from '../../reducers/student/search'

export default superclass => class SearchRepository extends superclass {}

export class SearchProvider {
    static mapStateToProps = state => ({
        subjectsList: state.search.subjectsList,
        searchResults: state.search.searchResults,
        searchValue: state.search.searchValue
    })

    static mapDispatchToProps = {
        getSearchSubjects,
        getAllSubjects,
        setSearch
    }
}
