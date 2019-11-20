import Nav from './nav'
import { connect } from 'react-redux'

function mapState(state: any) {
  const router = state.router
  return { router }
}

export default connect(mapState)(Nav)
