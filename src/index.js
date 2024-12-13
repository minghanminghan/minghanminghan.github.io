import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Home from './pages/Home.js';
import Work from './pages/Work.js';
import Contact from './pages/Contact.js';
import Resume from './pages/Resume.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<Work />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/resume" element={<Resume />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
