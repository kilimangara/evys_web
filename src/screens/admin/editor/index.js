import React from 'react'
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'

import grapesWebPreset from 'grapesjs-preset-webpage'
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css'

class GrapeEditorDemo extends React.Component {
    componentDidMount() {
        const editor = grapesjs.init({
            // Indicate where to init the editor. You can also pass an HTMLElement
            container: '#gjs',
            plugins: [grapesWebPreset],
            pluginsOpts: {
                'gjs-blocks-basic': {
                    flexGrid: true
                }
            }
        })
        const panelManager = editor.Panels
    }

    render() {
        return <div id="gjs" />
    }
}

export default GrapeEditorDemo
