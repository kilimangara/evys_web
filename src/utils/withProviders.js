import {compose} from 'recompose'
import { connect } from 'react-redux'

export default (...providers) => (component) => {
  const connectedProviders = providers.map((p) => connect(p.mapStateToProps, p.mapDispatchToProps))
  return compose(...connectedProviders)(component)
}
