import { React } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './view/pages/Home';
import Login from './view/pages/Login';
import Detail from './view/pages/Detail';
import Register from './view/pages/Register';
import Leaderboard from './view/pages/Leaderboard';
import './assets/css/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
