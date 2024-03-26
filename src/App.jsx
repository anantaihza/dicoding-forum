import { React, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import getUsers from './redux/features/users/usersThunk';
import Home from './view/pages/Home';
import Login from './view/pages/Login';
import Detail from './view/pages/Detail';
import Register from './view/pages/Register';
import Leaderboard from './view/pages/Leaderboard';
import './assets/css/App.css';

function App() {
  const dispatch = useDispatch();

  // getUsers is called here because it is too much
  useEffect(() => {
    dispatch(getUsers());
  })

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
