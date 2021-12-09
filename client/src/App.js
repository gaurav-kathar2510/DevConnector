import React, {Fragment } from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';

const  App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar/>        
        
        <section className="container">
          <Routes>
            <Route path='/' exact element = {<Landing />}/>
            <Route path = "/register" element = {<Register />}/>
            <Route path = "/Login" element = {<Login />}/>
          </Routes>
        </section>
        <Landing/>
      </Fragment>
  </BrowserRouter>
    
  );
}

export default App;
