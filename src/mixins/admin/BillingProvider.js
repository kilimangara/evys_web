import { getBillingPlan, createBillingPlan } from '../../api'

export default superclass =>
    class BillingProvider extends superclass {
        loadBillingPlan = () => {
            return getBillingPlan().then(({ data }) => {
                this.setState({
                    billingPlan: data,
                    personalStudents: data.personalStudents,
                    personalSubjects: data.personalSubjects
                })
            })
        }

        createDraftBillingPlan = data => {
            return createBillingPlan(data, true).then(({ data }) => {
                console.log(data)
                this.setState({
                    billingPlan: data,
                    personalStudents: data.personalStudents,
                    personalSubjects: data.personalSubjects,
                    changed: true
                })
            })
        }

        changeBillingPlan = data => {
            return createBillingPlan(data, false).then(({ data }) => {
                this.setState({
                    billingPlan: data,
                    personalStudents: data.personalStudents,
                    personalSubjects: data.personalSubjects,
                    changed: true
                })
                this.props.history.replace(`/admin/settings/invoices`)
            })
        }
    }
