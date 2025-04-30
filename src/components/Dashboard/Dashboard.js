import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import ProgressChart from './ProgressChart';
import { 
  getUserCompletedTasks, 
  getTaskById, 
  getUserBadges,
  calculateLevel
} from '../../services/mockData';

const Dashboard = () => {
  const { currentUser, updateUserData } = useAuth();
  const [completedTasks, setCompletedTasks] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const [tasksByCategory, setTasksByCategory] = useState({});
  
  useEffect(() => {
    // Get user's completed tasks
    const userTasks = getUserCompletedTasks(currentUser.id);
    setCompletedTasks(userTasks);
    
    // Get recent tasks (last 5)
    const recent = [...userTasks]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    
    // Enhance recent tasks with task details
    const enhancedRecentTasks = recent.map(task => {
      const taskDetails = getTaskById(task.taskId);
      return { ...task, ...taskDetails };
    });
    
    setRecentTasks(enhancedRecentTasks);
    
    // Calculate tasks by category for the chart
    const categoryMap = {};
    userTasks.forEach(task => {
      const taskDetails = getTaskById(task.taskId);
      if (taskDetails) {
        const { category } = taskDetails;
        categoryMap[category] = (categoryMap[category] || 0) + 1;
      }
    });
    setTasksByCategory(categoryMap);
    
    // Get user's earned badges
    const badges = getUserBadges(currentUser.id, currentUser.points, userTasks);
    setUserBadges(badges);
    
    // Update user level if needed
    const calculatedLevel = calculateLevel(currentUser.points);
    if (calculatedLevel !== currentUser.level) {
      updateUserData({ level: calculatedLevel });
    }
  }, [currentUser, updateUserData]);

  return (
    <div>
      <div className="container">
        <h2>Welcome, {currentUser.name}!</h2>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Level</h3>
            <p className="stat-value">{currentUser.level}</p>
          </div>
          <div className="stat-card">
            <h3>Points</h3>
            <p className="stat-value">{currentUser.points}</p>
          </div>
          <div className="stat-card">
            <h3>Tasks Completed</h3>
            <p className="stat-value">{completedTasks.length}</p>
          </div>
          <div className="stat-card">
            <h3>Badges Earned</h3>
            <p className="stat-value">{userBadges.length}</p>
          </div>
        </div>
        
        <div className="dashboard-row">
          <div className="dashboard-col">
            <div className="dashboard-card">
              <h3>Recent Activity</h3>
              {recentTasks.length > 0 ? (
                <ul className="recent-tasks-list">
                  {recentTasks.map((task) => (
                    <li key={task.id} className="recent-task-item">
                      <span className="task-name">{task.name}</span>
                      <span className="task-date">{new Date(task.date).toLocaleDateString()}</span>
                      <span className="task-points">+{task.points} pts</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recent activity. Start logging eco-friendly tasks!</p>
              )}
              <Link to="/tasks" className="btn btn-primary">Log New Task</Link>
            </div>
          </div>
          
          <div className="dashboard-col">
            <div className="dashboard-card">
              <h3>Your Progress</h3>
              <ProgressChart tasksByCategory={tasksByCategory} />
            </div>
          </div>
        </div>
        
        <div className="dashboard-row">
          <div className="dashboard-card full-width">
            <h3>Recent Badges</h3>
            {userBadges.length > 0 ? (
              <div className="badges-container">
                {userBadges.slice(0, 4).map((badge) => (
                  <div key={badge.id} className="badge-item">
                    <div className="badge-icon">{badge.icon}</div>
                    <div className="badge-info">
                      <h4>{badge.name}</h4>
                      <p>{badge.description}</p>
                    </div>
                  </div>
                ))}
                {userBadges.length > 4 && (
                  <Link to="/badges" className="view-all-link">View all badges</Link>
                )}
              </div>
            ) : (
              <p>No badges earned yet. Complete more eco-tasks to earn badges!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;