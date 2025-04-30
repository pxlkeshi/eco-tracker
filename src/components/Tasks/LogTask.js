import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { getAllTasks, getTaskById, logCompletedTask } from '../../services/mockData';

const LogTask = () => {
  const { taskId } = useParams();
  const { currentUser, updateUserData } = useAuth();
  const navigate = useNavigate();
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [availableTasks, setAvailableTasks] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        if (taskId) {
          // If taskId is provided, fetch that specific task
          const task = await getTaskById(taskId);
          if (task) {
            setSelectedTask(task);
          } else {
            setError('Task not found');
          }
        } else {
          // Otherwise, fetch all available tasks
          const tasks = await getAllTasks();
          setAvailableTasks(tasks);
          if (tasks.length > 0) {
            setSelectedTask(tasks[0]);
          }
        }
      } catch (err) {
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, [taskId]);
  
  const handleTaskChange = (e) => {
    const taskId = e.target.value;
    const task = availableTasks.find(t => t.id === taskId);
    setSelectedTask(task);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedTask) {
      setError('Please select a task');
      return;
    }
    
    try {
      // Log the completed task
      const result = await logCompletedTask({
        userId: currentUser.id,
        taskId: selectedTask.id,
        date,
        notes,
      });
      
      // Update user points
      updateUserData({
        points: currentUser.points + selectedTask.points
      });
      
      // Navigate to dashboard with success message
      navigate('/dashboard', { 
        state: { 
          message: `Task logged successfully! You earned ${selectedTask.points} points.`,
          type: 'success'
        }
      });
    } catch (err) {
      setError('Failed to log task. Please try again.');
    }
  };
  
  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }
  
  return (
    <div className="container">
      <h2>Log Eco-Friendly Task</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="log-task-form">
        <div className="form-group">
          <label htmlFor="task">Select Task:</label>
          {taskId ? (
            <div className="selected-task-info">
              {selectedTask ? (
                <>
                  <h3>{selectedTask.name}</h3>
                  <p>{selectedTask.description}</p>
                  <p className="task-points">Points: {selectedTask.points}</p>
                  <p className="task-category">Category: {selectedTask.category}</p>
                </>
              ) : (
                <p>Task not found</p>
              )}
            </div>
          ) : (
            <select 
              id="task" 
              value={selectedTask?.id || ''} 
              onChange={handleTaskChange}
              required
            >
              {availableTasks.map(task => (
                <option key={task.id} value={task.id}>
                  {task.name} ({task.points} points)
                </option>
              ))}
            </select>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Date Completed:</label>
          <input 
            type="date" 
            id="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notes (optional):</label>
          <textarea 
            id="notes" 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any details about how you completed this task..."
            rows="4"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Log Task
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogTask;