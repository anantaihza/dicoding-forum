import { React } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './view/pages/Home';
import './assets/css/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
);
}

export default App;
