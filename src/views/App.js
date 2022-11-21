import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import Homepage from './Homepage';
import ScanResult from './ScanResult';
import { Routes, Route, Navigate } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="scan-result" element={<ScanResult />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
