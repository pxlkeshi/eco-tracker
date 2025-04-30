import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import Dashboard from './components/Dashboard/Dashboard';
import TaskList from './components/Tasks/TaskList';
import LogTask from './components/Tasks/LogTask';
import AddTask from './components/Tasks/AddTask';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/tasks/log/:taskId" element={<LogTask />} />
              <Route path="/tasks/log" element={<LogTask />} />
              <Route path="/tasks/add" element={<AddTask />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
