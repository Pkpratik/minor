import React from 'react'
import {useAuth0} from '@auth0/auth0-react'

export default function Profile() {
    const {user,isAuthenticated} = useAuth0();
    
    return (
        isAuthenticated && (<>
            
            {console.log(JSON.stringify(user,null,2))}
        
            <li class="nav-item">
                    <p className="nav-link" ><img src={user.picture} class="rounded-circle" id="profile_img"
                            alt="profile" /></p>
                </li>
                <li class="nav-item" id="user_name">
                    <p className="nav-link" ><span class="font-weight-bolder">Hello</span> {user.name}
                    </p>
                </li>
        
        </>


        ))
}
