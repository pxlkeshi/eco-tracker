import React, { useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { addCustomTask } from '../../services/mockData';

const AddTask = ({ onTaskAdded }) => {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [points, setPoints] = useState(5);
  const [impact, setImpact] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const categories = ['Energy', 'Water', 'Waste', 'Transportation', 'Food', 'Other'];
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !description || !category || !impact) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      await addCustomTask({
        name,
        description,
        category,
        points: Number(points),
        impact,
        createdBy: currentUser.id
      });
      
      // Reset form and notify parent
      setName('');
      setDescription('');
      setCategory('');
      setPoints(5);
      setImpact('');
      
      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (err) {
      setError(err.message || 'Failed to add task');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="add-task-form">
      <h3>Add Custom Eco-Task</h3>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="taskName">Task Name</label>
          <input
            type="text"
            id="taskName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="taskDescription">Description</label>
          <textarea
            id="taskDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            rows="3"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="taskCategory">Category</label>
            <select
              id="taskCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group col-md-6">
            <label htmlFor="taskPoints">Points (1-20)</label>
            <input
              type="number"
              id="taskPoints"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="form-control"
              min="1"
              max="20"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="taskImpact">Environmental Impact</label>
          <input
            type="text"
            id="taskImpact"
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
            className="form-control"
            placeholder="e.g., Reduces carbon emissions by X amount"
            required
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Task'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onTaskAdded}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;