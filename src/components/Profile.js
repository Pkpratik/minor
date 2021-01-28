import React from 'react'
import {useAuth0} from '@auth0/auth0-react'

export default function Profile() {
    const {user,isAuthenticated} = useAuth0();
    return (
        isAuthenticated && (<>
            
            {console.log(JSON.stringify(user,null,2))}
        
            <li class="nav-item">
                    <a class="nav-link" href="#"><img src={user.picture} class="rounded-circle" id="profile_img"
                            alt="profile" /></a>
                </li>
                <li class="nav-item" id="user_name">
                    <p class="nav-link" href="#"><span class="font-weight-bolder">Hello</span> {user.name}
                    </p>
                </li>
        
        </>


        ))
}
