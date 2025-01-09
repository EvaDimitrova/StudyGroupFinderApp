import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import InformationPage from './InformationPage';
import Navbar from './Navbar';
import Login from './Login';
import CreateGroup from './CreateGroup';

const App = () => {
  return (
    <Router> {}
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/info" element={<InformationPage />} />
        <Route path="/createGroup" element={<CreateGroup />} />
      </Routes>
    </Router>
  );
};

export default App;
