import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import InformationPage from './InformationPage/InformationPage';
import Navbar from './HomePage/Navbar';
import Login from './LoginPage/Login';
import CreateGroup from './CreateGroupPage/CreateGroup';
import AccountPage from './AccountPage/AccountPage';

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/information/:groupId" element={<InformationPage />} />
        <Route path="/createGroup" element={<CreateGroup />} />
        <Route path="/account" element={<AccountPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
