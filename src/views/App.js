import React from 'react';
import './App.scss';
import LoginPage from './LoginPage';
import Homepage from './Homepage';
import { Routes, Route, Navigate } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
