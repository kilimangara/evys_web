import {startTestsSession} from "../../reducers/student/tests";

export default superclass => class TestsRepository extends superclass {

}


export class TestsProvider {
    static mapStateToProps = state => ({
        testBlockId: state.tests.testBlockId
    })

    static mapDispatchToProps = {
        startTestsSession
    }
}
