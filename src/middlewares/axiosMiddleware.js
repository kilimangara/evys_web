import axios from 'axios'

const isValidFetchingAction = action => action.types && action.meta && action.meta.fetch && action.meta.fetch.url

export default store => next => action => {
    if (isValidFetchingAction(action)) {
        const fetch = action.meta.fetch
        delete action.meta.fetch
        if (Object.keys(action.types).length >= 3) {
            const {load, success, failure} = action.types

            next({ type: load, meta: action.meta })

            return axios(fetch)
                .then(response => {
                    store.dispatch({ type: success, payload: response.data, response, meta: action.meta })
                    return response
                })
                .catch(err => {
                    store.dispatch({ type: failure, payload: err.data, response: failure, meta: action.meta })
                    throw err
                })
        }
    }

    return next(action)
}
