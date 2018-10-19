import React from 'react'
import ReactDOM from 'react-dom'
import AdminRoot from './AdminRoot'
import { AppContainer } from 'react-hot-loader'
import { init, captureMessage } from '@sentry/browser'

init({
    dsn: 'https://7c9f295a4fd14db2b404479759631025@sentry.io/1305053'
})

const render = () =>
    ReactDOM.render(
        <AppContainer>
            <AdminRoot />
        </AppContainer>,
        document.getElementById('react-app')
    )

render()

if (module.hot) {
    module.hot.accept('./AdminRoot', () => render())
}
