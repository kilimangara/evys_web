import { createAction, createReducer } from 'redux-act'
import { sendTestQuestionAnswer, startTestingSession } from '../../api'

const initialState = {
    fetching: false,
    sessionActive: false,
    testBlockId: null,
    testFinished: false
}

const sessionStarted = createAction('tests/session-started')
const questionSended = createAction('tests/question-sended')
const changeTestBlock = createAction('tests/change-test-block')
const fetchStart = createAction('tests/fetch-start')
const questionFetchSuccess = createAction('tests/question-fetch-success')
const testFinished = createAction('tests/test-finished')

export const startTestsSession = themeId => dispatch => {
    return startTestingSession(themeId).then(response => dispatch(sessionStarted(response)))
}

export const sendAnswer = (themeId, data) => dispatch => {
    return sendTestQuestionAnswer(themeId, data).then(res => {
        dispatch(questionSended(res))

        if (res.data.blockEnd) {
            if (res.data.changeBlockId !== null) {
                dispatch(changeTestBlock(res.data.changeBlockId))
            } else {
                dispatch(testFinished())
            }
        }
        return res
    })
}

export default createReducer(
    {
        [sessionStarted]: (state, payload) => ({ ...state, sessionActive: true, testBlockId: payload.data.id }),
        [fetchStart]: state => ({ ...state, fetching: true }),
        [questionSended]: state => ({ ...state, fetching: false }),
        [questionFetchSuccess]: state => ({ ...state, fetching: false }),
        [changeTestBlock]: (state, id) => ({ ...state, testBlockId: id }),
        [testFinished]: state => ({ ...state, testFinished: true })
    },
    initialState
)
