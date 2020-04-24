import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthorizedRoute = ({ component: Component, path, redirect, ...props}) => {
    const authenticated = props.authenticated
        return (<Route path={path} render={(props) => authenticated ?  
                <Component {...props} /> : <Redirect to={redirect} />} 
            />);
}


export default AuthorizedRoute;