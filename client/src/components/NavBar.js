import { Link } from "react-router-dom";
import React from 'react';
import { withRouter } from 'react-router-dom';


import axios from 'axios';
import { USER_SERVER } from '../Config';
import { useSelector } from "react-redux";

function Navbar(props) {

    const user = useSelector(state => state.user)
    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert('Log Out Failed')
            }
        });
    };


    return (
        <section>
                <nav id="navbar">
                
                    <div className="nav-login">
                        {user.userData && !user.userData.isAuth ? <ul className="nav-sign">
                            <li>
                                <Link to="/login" >Signin</Link>
                            </li>
                            <li>
                                <Link to="/register">Signup</Link>
                            </li>
                        </ul>
                            :
                            <ul className="nav-sign ">
                                <li>
                                    <Link to="/uploadpost">Upload Post</Link>
                                </li>
                                <li>
                                    <Link onClick={logoutHandler}>Logout</Link>
                                </li>
                            </ul>}
                            <div className="nav-sign" ><Link to="/">Home</Link></div>
                    </div>
                </nav>
        </section>


    )
}


export default withRouter(Navbar);
