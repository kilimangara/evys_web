export default class ZendeskApi {
    static initSettings = () => {
        window.zESettings = {
            webWidget: {
                position: { horizontal: 'left', vertical: 'bottom' },
                color: {
                    theme: '#5e35b1',
                    launcher: '#5e35b1'
                }
            }
        }
    }

    static initChat = () => {
        ZendeskApi.initSettings()
        var s = document.createElement('script')
        s.type = 'text/javascript'
        s.async = true
        s.id = 'ze-snippet'
        s.src = 'https://static.zdassets.com/ekr/snippet.js?key=1f5ec580-74c1-4aa7-81d3-c1e6183a6883'
        var ss = document.getElementsByTagName('script')[0]
        ss.parentNode.insertBefore(s, ss)
    }
}
