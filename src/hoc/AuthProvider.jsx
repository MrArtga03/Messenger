import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState(null)

  const signin = (newUser, newPassword, cb) => {
    setUser(newUser)
    setPassword(newPassword)
    cb()
  }

  const signout = cb => {
    setUser(null)
    setPassword(null)
    cb()
  }

  const value = { user, password, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propsTypes = {
  children: PropTypes.object,
}

export default AuthProvider
