export default class JivoApi {
    static widgetId = 'eE5KIqD4op'

    static initJivo = () => {
        var s = document.createElement('script')
        s.type = 'text/javascript'
        s.async = true
        s.src = '//code.jivosite.com/script/widget/' + JivoApi.widgetId
        var ss = document.getElementsByTagName('script')[0]
        ss.parentNode.insertBefore(s, ss)
    }

    openDialog() {
        window.jivo_api.open()
    }

    chatMode() {
        return window.jivo_api.chatMode()
    }

    closeDialog() {
        return window.jivo_api.close()
    }

    setUserData(data) {
        if (!window.jivo_api) return null
        window.jivo_api.setContactInfo(data)
    }
}
