import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './contexts/UserAuthentication'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />)}
    />
  )
}

export default ProtectedRoute
