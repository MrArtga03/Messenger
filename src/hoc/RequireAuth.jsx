import PropTypes from 'prop-types'
import { useLocation, Navigate } from 'react-router-dom'

import { useAuth } from '../hook/useAuth'

const RequireAuth = ({ children }) => {
  const location = useLocation()
  const { user } = useAuth()
  const { password } = useAuth()

  if (!user || !password) {
    return <Navigate to='/auth' state={{ from: location }} />
  }

  return children
}

RequireAuth.propsTypes = {
  children: PropTypes.object,
}

export default RequireAuth
