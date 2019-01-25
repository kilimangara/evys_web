import { createAction, createReducer } from 'redux-act'
import { startTestingSession } from '../../api'

const initialState = {
    sessionActive: false,
    testBlockId: null
}

const sessionStarted = createAction('tests/session-started')

export const startTestsSession = themeId => dispatch => {
    return startTestingSession(themeId).then(response => dispatch(sessionStarted(response)))
}

export default createReducer(
    {
        [sessionStarted]: (state, payload) => ({ ...state, sessionActive: true, testBlockId: payload.id })
    },
    initialState
)
