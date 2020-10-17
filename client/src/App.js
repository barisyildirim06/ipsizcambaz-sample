import React from 'react';
import './styles/styles.css';
import { Route, Switch } from "react-router-dom";
import Auth from "./hoc/auth";
// pages for this product
import Home from "./components/Home.js";
import LoginPage from "./components/LoginPage.js";
import RegisterPage from "./components/RegisterPage.js";
import NavBar from "./components/NavBar";
import UploadProductPage from './components/UploadProductPage';
import Admin from './components/Admin';
import SinglePost from './components/SinglePost';
import EditPost from './components/EditPost'
import NotFound from './components/NotFound';
import ViewPost from './components/ViewPost';




//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside


function App() {
  return (
    <div >
      <NavBar />
      <div className="container">
        <Switch >
          <Route exact path="/" component={Auth(Home, true)} />
          <Route exact path="/uploadpost" component={Auth(UploadProductPage, true)} />
          <Route exact path="/update/:productId" component={Auth(EditPost, true)} />
          <Route exact path="/view/:productId" component={Auth(ViewPost, true)} />
          <Route exact path="/admin" component={Auth(Admin, true)} />
          <Route exact path="/posts/:productId" component={Auth(SinglePost, true)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="*" component={Auth(NotFound, null)} />
        </Switch>
      </div>

    </div>


  );
}

export default App;
