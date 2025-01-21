import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Exercises from './pages/Exercises';
import WaterConsumption from './pages/WaterConsumption';
import Recipes from './pages/Recipes';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/NavBar';
import Settings from './pages/Settings';
import Contact from './pages/Contact';
import ResetPassword from './pages/ResetPassword';
import NutritionDiary from './pages/NutritionDiary';
import Home from './pages/Home'; // Yeni eklenen Home bileşeni
import './App.css';

function App() {
  const [authToken, setAuthToken] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
    <UserProvider>
      <Router>
        <div>
          <Navbar isAuthenticated={authToken} setAuthToken={setAuthToken} />
          <Routes>
            <Route path="/" element={<Home />} /> {/* Login öncesi */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setAuthToken={setAuthToken} setUserId={setUserId} />} />
            <Route
              path="/exercises"
              element={
                <PrivateRoute authToken={authToken}>
                  <Exercises />
                </PrivateRoute>
              }
            />
            <Route
              path="/water-consumption"
              element={
                <PrivateRoute authToken={authToken}>
                  <WaterConsumption />
                </PrivateRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/recipes"
              element={
                <PrivateRoute authToken={authToken}>
                  <Recipes authToken={authToken} userId={userId} />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute authToken={authToken}>
                  <Dashboard authToken={authToken} />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute authToken={authToken}>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute authToken={authToken}>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/nutrition-diary"
              element={
                <PrivateRoute authToken={authToken}>
                  <NutritionDiary authToken={authToken} />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
