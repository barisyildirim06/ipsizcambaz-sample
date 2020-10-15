import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Auth from "./hoc/auth";
// pages for this product
import Home from "./components/Home.js";
import LoginPage from "./components/LoginPage.js";
import RegisterPage from "./components/RegisterPage.js";
import Comment from "./components/Comment.js";
import NavBar from "./components/NavBar";
import UploadProductPage from './components/UploadProductPage';
import Admin from './components/Admin';
import SinglePost from './components/SinglePost';
import EditPost from './components/EditPost'
import NotFound from './components/NotFound';



//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside


function App() {
  return (
    <div id="marginLeft">
        <NavBar />
          <Switch>
            <Route exact path="/" component={Auth(Home, true)} />
            <Route exact path="/uploadpost" component={Auth(UploadProductPage, true)} />
            <Route exact path="/update/:productId" component={Auth(EditPost, true)} />
            <Route exact path="/admin/:adminId" component={Auth(Admin, true)} />
            <Route exact path="/posts/:productId" component={Auth(SinglePost, true)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/savecomment" component={Auth(Comment, true)} />
            <Route exact path="*" component={Auth(NotFound, null)}/>
          </Switch>
    </div>


  );
}

export default App;
