import { Link } from "react-router-dom";

import React from 'react';

import { withRouter } from 'react-router-dom';

import axios from 'axios';
import { USER_SERVER } from '../Config';
import { useSelector } from "react-redux";
import SearchFeature from "./utils/SearchFeature";
import * as ReactBootStrap from "react-bootstrap"


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
    <ReactBootStrap.Navbar bg="dark" variant="dark" expand="lg">
      <ReactBootStrap.Navbar.Brand >Home</ReactBootStrap.Navbar.Brand>
      <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
      <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
        <SearchFeature />
        <ReactBootStrap.Nav className="ml-auto">
          {user.userData && !user.userData.isAuth ?
            <>
              <ReactBootStrap.Nav.Link ><Link to="/login" >Signin</Link></ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link ><Link to="/register" >Signup</Link></ReactBootStrap.Nav.Link>
            </>
            :
            <>
              <ReactBootStrap.Nav.Link ><Link to="/uploadpost" >Upload Post</Link></ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link ><Link onClick={logoutHandler} >Logout</Link></ReactBootStrap.Nav.Link>
            </>
          }
        </ReactBootStrap.Nav>
      </ReactBootStrap.Navbar.Collapse>
    </ReactBootStrap.Navbar>
  )
}


export default withRouter(Navbar);
