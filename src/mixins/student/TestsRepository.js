import {sendAnswer, startTestsSession} from "../../reducers/student/tests";
import {getTestQuestion} from "../../api";

export default superclass => class TestsRepository extends superclass {




}


export class TestsProvider {
    static mapStateToProps = state => ({
        testBlockId: state.tests.testBlockId,
        testFinished: state.tests.testFinished,
    })

    static mapDispatchToProps = {
        startTestsSession,
        sendAnswer
    }
}
