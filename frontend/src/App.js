import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import FileUploadPage from './pages/FileUploadPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<FileUploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
