import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import { AppContainer } from 'react-hot-loader'
import { init, captureMessage } from '@sentry/browser'
import katex from 'katex'
import "katex/dist/katex.css"

init({
    dsn: 'https://7c9f295a4fd14db2b404479759631025@sentry.io/1305053'
})

const render = () =>
    ReactDOM.render(
        <AppContainer>
            <Root />
        </AppContainer>,
        document.getElementById('react-app')
    )

render()

if (module.hot) {
    module.hot.accept('./Root', () => render())
}
