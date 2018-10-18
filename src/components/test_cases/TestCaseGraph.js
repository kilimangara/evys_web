export const GRAPH_OPTIONS = {
    nodes: {
        color: {
            border: 'rgba(255,255,255,1)',
            background: 'rgba(30,170,240)',
            highlight: {
                border: 'rgba(0,0,0,1)',
                background: 'rgba(0,0,0,1)'
            },
            hover: {
                border: 'rgba(101,111,114,1)',
                background: 'rgba(98,99,98,1)'
            }
        },
        font: {
            color: 'rgba(255,255,255,1)'
        },
        shape: 'box'
    },
    edges: {
        shadow: {
            enabled: true
        },
        smooth: {
            forceDirection: 'none'
        }
    },
    interaction: {
        navigationButtons: true
    },
    physics: {
        enabled: false,
        minVelocity: 0.75
    }
}
