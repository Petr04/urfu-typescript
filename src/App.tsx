import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import User from './components/User';
import Register from './components/Register';
import Profile from './components/Profile';
import { RootState } from './store/store';
import './styles.css';

const App = () => {
  const token = useSelector((state: RootState) => state.user.token);

  return (
    <div className="app">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/register" />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
};

export default App;
