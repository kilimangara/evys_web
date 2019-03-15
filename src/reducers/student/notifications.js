import { createAction, createReducer } from 'redux-act'
import { getEvents, sendTestQuestionAnswer, startTestingSession } from '../../api'

const initialState = {
    fetching: false,
    hasNotifications: false
}

const fetchStart = createAction('notifications/fetch-start')
const notificationsFetched = createAction('notifications/notifications-started')

export const fetchNotifications = params => dispatch => {
    dispatch(fetchStart())
    return getEvents(params).then(response => {
        dispatch(notificationsFetched(response && response.data.length))
        return response
    })
}

export default createReducer(
    {
        [fetchStart]: state => ({ ...state, fetching: true }),
        [notificationsFetched]: (state, payload) => ({ ...state, fetching: false, hasNotifications: !!payload })
    },
    initialState
)
