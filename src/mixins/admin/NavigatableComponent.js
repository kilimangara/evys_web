import React from 'react'
import { connect } from 'react-redux'
import { changeHeader } from '../../reducers/admin/navigation'

export default superclass =>
    class NavigatableComponent extends superclass {
        changeNavigation = data => {
            this.props.changeHeader(data)
        }

        changeHeader = header => {
            this.props.changeHeader({ header, backUrl: null })
        }

        changeUrl = backUrl => {
            this.props.changeHeader({ header: null, backUrl })
        }
    }

export class NavigationProvider {
    static mapStateToProps = null

    static mapDispatchToProps = {
        changeHeader
    }
}
