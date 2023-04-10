
import './App.css';
import React from 'react';
import LoginScreen from './examples/LoginScreen';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterScreen from './examples/RegisterScreen';
import HomeScreen from './examples/HomeScreen'





function App  () {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element ={<LoginScreen/> } />
        <Route path="/register" element={<RegisterScreen/>} />
        <Route exact path="/home" element={<HomeScreen/>} />
      </Routes>
    </Router>
  );
};

   




export default App;
