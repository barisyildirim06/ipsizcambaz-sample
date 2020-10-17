import { Link } from "react-router-dom";

import React, { useState } from 'react';

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
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

      <Link to="/" className="navbar-brand">Home</Link>
      <div className="navbar-collapse">
        {user.userData && !user.userData.isAuth ? <ul className="navbar-nav ml-auto nav-links">
          <li className="nav-item">
            <Link to="/login" className="item">Signin</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="item">Signup</Link>
          </li>
        </ul>
          :
          <ul className="navbar-nav ml-auto nav-links">
            <li className="nav-item">
              <Link to="/uploadpost" className="item">Upload Post</Link>
            </li>
            <li className="nav-item">
              <Link onClick={logoutHandler} className="item">Logout</Link>
            </li>
          </ul>
        }

      </div>
      
    </nav>


  )
}


export default withRouter(Navbar);
