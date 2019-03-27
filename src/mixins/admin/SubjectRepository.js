import {
    loadSubject,
    loadSubjects,
    newSubject,
    removeSubject,
    updateSubject,
    fetchSubjectCategories,
    loadSubjectStudents,
    loadSubjectStudent,
    loadStudentSubscription,
    updateStudentSubcription
} from '../../reducers/admin/subjects'
import { pickBy } from 'lodash'

export default superclass =>
    class SubjectRepository extends superclass {
        //Здесь методы для работы с данными из компонента

        getSubject = () => {
            const id = this.subjectId()
            this.props.loadSubject(id)
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

        deleteSubject = () => {
            return this.props.deleteSubject(this.subjectId())
        }

        getStudentBySubject = () => {
            return this.props.loadSubjectStudent(this.subjectId(), this.studentId()).then(({ data }) => {
                this.setState({
                    student: data
                })
            })
        }

        getStudentSubcription = () => {
            return this.props.loadStudentSubscription(this.subjectId(), this.studentId()).then(({ data }) => {
                this.setState({
                    subscription: data
                })
            })
        }

        updateStudentSubcription = () => {
            return this.props
                .updateStudentSubcription(this.subjectId(), this.studentId(), this.state.subscription)
                .then(({ data }) => {
                    this.setState({
                        subscription: data
                    })
                })
        }

        subjectId = () => this.props.match.params['subjectId']

        studentId = () => this.props.match.params['studentId']

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
        deleteSubject: removeSubject,
        fetchSubjectCategories,
        loadSubjectStudent,
        loadStudentSubscription,
        updateStudentSubcription
    }
}
