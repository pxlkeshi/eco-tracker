import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>ECOtracker</h3>
            <p>Track your eco-friendly habits and make a positive impact on the environment.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/tasks">Tasks</a></li>
              <li><a href="/leaderboard">Leaderboard</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Connect</h3>
            <div className="social-links">
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Facebook</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ECOtracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;