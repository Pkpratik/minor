import React from 'react'
import {useAuth0} from '@auth0/auth0-react'

export default function LoginButton() {
    const {loginWithRedirect,isAuthenticated} = useAuth0();
    return (
        !isAuthenticated &&(
        <button className="nav-link btn btn-secondary text-white py-1 px-3" onClick={()=>loginWithRedirect()}>Log in</button>
    ))
}
