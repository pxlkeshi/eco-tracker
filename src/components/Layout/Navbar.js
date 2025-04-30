import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
      // In a real app, you might redirect to login page here
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🌱</span>
          <span className="logo-text">ECOtracker</span>
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/dashboard" className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }>
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/tasks" className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }>
              Tasks
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/leaderboard" className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }>
              Leaderboard
            </NavLink>
          </li>
        </ul>
        
        <div className="user-menu">
          {currentUser && (
            <>
              <div className="user-info">
                <span className="user-name">{currentUser.name}</span>
                <span className="user-points">{currentUser.points} pts</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;