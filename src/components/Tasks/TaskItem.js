import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task, isCompleted, completedDate }) => {
  const categoryIcons = {
    'Energy': '⚡',
    'Water': '💧',
    'Waste': '♻️',
    'Transportation': '🚲',
    'Food': '🥗',
    'Other': '🌱'
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
      <div className="task-category">
        <span className="category-icon">{categoryIcons[task.category] || '🌱'}</span>
        <span className="category-name">{task.category}</span>
      </div>
      
      <h3 className="task-name">{task.name}</h3>
      <p className="task-description">{task.description}</p>
      
      <div className="task-details">
        <span className="task-points">+{task.points} points</span>
        <span className="task-difficulty">
          Difficulty: {Array(task.difficulty).fill('★').join('')}
        </span>
      </div>
      
      {isCompleted ? (
        <div className="task-completed">
          <span className="completed-badge">✓ Completed</span>
          <span className="completed-date">{formatDate(completedDate)}</span>
        </div>
      ) : (
        <Link to={`/tasks/log/${task.id}`} className="btn btn-secondary">
          Log as Completed
        </Link>
      )}
    </div>
  );
};

export default TaskItem;