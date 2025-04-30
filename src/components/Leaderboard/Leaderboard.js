import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { getLeaderboard } from '../../services/mockData';

const Leaderboard = () => {
  const { currentUser } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [timeFrame, setTimeFrame] = useState('weekly');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const data = await getLeaderboard(timeFrame);
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [timeFrame]);
  
  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };
  
  const getUserRank = () => {
    if (!currentUser || leaderboardData.length === 0) return 'N/A';
    const userRank = leaderboardData.findIndex(user => user.id === currentUser.id) + 1;
    return userRank > 0 ? userRank : 'Not ranked';
  };

  return (
    <div className="container">
      <h2>Eco Champions Leaderboard</h2>
      
      <div className="leaderboard-header">
        <div className="timeframe-selector">
          <button 
            className={`timeframe-btn ${timeFrame === 'weekly' ? 'active' : ''}`}
            onClick={() => handleTimeFrameChange('weekly')}
          >
            Weekly
          </button>
          <button 
            className={`timeframe-btn ${timeFrame === 'monthly' ? 'active' : ''}`}
            onClick={() => handleTimeFrameChange('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`timeframe-btn ${timeFrame === 'alltime' ? 'active' : ''}`}
            onClick={() => handleTimeFrameChange('alltime')}
          >
            All Time
          </button>
        </div>
        
        <div className="user-rank">
          Your Rank: <span className="rank-value">{getUserRank()}</span>
        </div>
      </div>
      
      {loading ? (
        <div className="loading">Loading leaderboard data...</div>
      ) : (
        <div className="leaderboard-table">
          <div className="leaderboard-header-row">
            <div className="rank-col">Rank</div>
            <div className="user-col">User</div>
            <div className="points-col">Points</div>
            <div className="level-col">Level</div>
            <div className="tasks-col">Tasks</div>
          </div>
          
          {leaderboardData.map((user, index) => (
            <div 
              key={user.id} 
              className={`leaderboard-row ${user.id === currentUser?.id ? 'current-user' : ''}`}
            >
              <div className="rank-col">
                {index === 0 && <span className="rank-icon gold">🥇</span>}
                {index === 1 && <span className="rank-icon silver">🥈</span>}
                {index === 2 && <span className="rank-icon bronze">🥉</span>}
                {index > 2 && <span className="rank-number">{index + 1}</span>}
              </div>
              <div className="user-col">
                <span className="user-avatar">{user.avatar || '👤'}</span>
                <span className="user-name">{user.name}</span>
              </div>
              <div className="points-col">{user.points}</div>
              <div className="level-col">{user.level}</div>
              <div className="tasks-col">{user.tasksCompleted}</div>
            </div>
          ))}
          
          {leaderboardData.length === 0 && (
            <div className="no-data">No leaderboard data available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;