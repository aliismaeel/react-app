import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Login } from './Components/Login';
import {Route, Routes} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom';
import User from './Components/User';
import Registration from './Components/Registration';
import Edit from './Pages/EditPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <Fragment>
    <Routes>
      <Route exact path="/" element={<App/>}> </Route>
      <Route exact path="/login" element={<Login/>}></Route>
      <Route exact path="/users" element={<User/>}></Route>
      <Route exact path="/registration" element={<Registration/>}></Route>
      <Route exact path="/editUser/:id" element={<Edit/>}></Route>
    </Routes>
    </Fragment>
    </Router>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
