import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import { AppContainer } from 'react-hot-loader'

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
