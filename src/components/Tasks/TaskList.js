import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTasks } from '../../services/mockData';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const allTasks = await getAllTasks();
        setTasks(allTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, []);
  
  // Get unique categories for filter
  const categories = ['all', ...new Set(tasks.map(task => task.category))];
  
  // Filter tasks based on category and search term
  const filteredTasks = tasks.filter(task => {
    const matchesCategory = filter === 'all' || task.category === filter;
    // Fix: Use task.title instead of task.name
    const matchesSearch = 
      (task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="container">
      <h2>Eco-Friendly Tasks</h2>
      <p className="subtitle">Choose a task to log and earn points for your eco-friendly actions!</p>
      
      <div className="task-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div key={task.id} className="task-card">
                <div className={`task-category ${task.category}`}>
                  {task.category}
                </div>
                {/* Fix: Use task.title instead of task.name */}
                <h3 className="task-name">{task.title}</h3>
                <p className="task-description">{task.description}</p>
                <div className="task-footer">
                  <span className="task-points">+{task.points} points</span>
                  {/* Fix: Update the route to match App.js routes */}
                  <Link to={`/tasks/log/${task.id}`} className="btn btn-primary">
                    Log Task
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-tasks">
              No tasks found matching your criteria. Try adjusting your filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;