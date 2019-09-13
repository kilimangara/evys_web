import React from 'react'
import ReactDOM from 'react-dom'
import AdminRoot from './AdminRoot'
import { AppContainer } from 'react-hot-loader'
import { init, captureMessage } from '@sentry/browser'
import { authorize } from './reducers/admin/authorization'
import { loadAccounts, chooseAccount } from './reducers/admin/account'
import { store, persistor } from './store'
import katex from 'katex'
import 'katex/dist/katex.css'
import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')

window.katex = katex

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

async function startApp() {
    try {
        // persistor.flush()
        await store.dispatch(authorize())
        const accounts = await store.dispatch(loadAccounts())
        if (accounts.length == 1) store.dispatch(chooseAccount(accounts[0].permalink))
    } catch (err) {
        console.log(err)
    } finally {
        render()
    }
}

startApp()

if (module.hot) {
    module.hot.accept('./AdminRoot', () => render())
}
