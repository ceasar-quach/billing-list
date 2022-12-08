import React, { useEffect } from 'react';

import {   
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';

import Navigation from './components/navigationBar';

import Login from './screens/login';
import Home from './screens/home';


export default function App() {
  useEffect(() => {
    document.title = "Kaiser Billing"
  })
  return (
    <Router>
      <div className="App vh-100 bg-secondary">
        <Navigation/>
          <Routes>
              <Route path="/" exact element={<Login/>} />
              <Route path="/home" exact element={<Home/>} />
          </Routes>
      </div>
    </Router>
  );
}
