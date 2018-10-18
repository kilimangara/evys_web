import React from 'react'
import ReactDOM from 'react-dom'
import AdminRoot from './AdminRoot'
import { AppContainer } from 'react-hot-loader'

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
