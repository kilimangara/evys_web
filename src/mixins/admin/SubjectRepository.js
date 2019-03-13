import {
    loadSubject,
    loadSubjects,
    newSubject,
    deleteSubject,
    updateSubject,
    fetchSubjectCategories
} from '../../reducers/admin/subjects'
import { pickBy } from 'lodash'

export default superclass =>
    class SubjectRepository extends superclass {
        //Здесь методы для работы с данными из компонента

        getSubject = () => {
            const id = this.subjectId()
            // if(this.props.subject && this.props.subject.id == id){
            //   this.setState({ subject: this.props.subject })
            // } else {
            this.props.loadSubject(id)
            // }
        }

        updateSubject = () => {
            const { subject } = this.state
            const sendedTariff = { ...subject.tariff }
            const sendedSubject = { ...subject, tariff: pickBy(sendedTariff, el => el != undefined && el != '') }
            return this.props.updateSubject(this.subjectId(), sendedSubject)
        }

        syncCategories = () => {
            this.props.fetchSubjectCategories().then(({ data }) => this.setState({ categories: data }))
        }

        subjectId = () => this.props.match.params['subjectId']

        subject = () => this.props.subject

        categories = () => this.state.categories

        isHidden = () => this.state.subject.tariff && this.state.subject.tariff.hidden
    }

export class SubjectProvider {
    static mapStateToProps = state => ({
        subjects: state.subjects.list,
        subjectsFetching: state.subjects.fetching,
        subject: state.subjects.current
    })

    static mapDispatchToProps = {
        loadSubject,
        loadSubjects,
        createSubject: newSubject,
        updateSubject,
        deleteSubject,
        fetchSubjectCategories
    }
}
