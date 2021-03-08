import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './contexts/UserAuthentication'
const PublicRoute = ({ component, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext)
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Redirect
                        to={{
                            pathname: "/app/dashboard",
                        }}
                    />
                ) : (
                        React.createElement(component, props)
                    )
            }
        />
    );
}
export default PublicRoute
