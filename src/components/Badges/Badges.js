import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { getAllBadges, getUserBadges } from '../../services/mockData';

const Badges = () => {
  const { currentUser } = useAuth();
  const [allBadges, setAllBadges] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBadges = async () => {
      setLoading(true);
      try {
        // Get all possible badges
        const badges = await getAllBadges();
        setAllBadges(badges);
        
        // Get user's earned badges
        const userBadges = await getUserBadges(
          currentUser.id, 
          currentUser.points, 
          currentUser.completedTasks
        );
        setEarnedBadges(userBadges);
      } catch (error) {
        console.error('Error fetching badges:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBadges();
  }, [currentUser]);
  
  // Check if user has earned a specific badge
  const hasBadge = (badgeId) => {
    return earnedBadges.some(badge => badge.id === badgeId);
  };
  
  if (loading) {
    return <div className="loading">Loading badges...</div>;
  }
  
  return (
    <div className="container">
      <h2>Your Eco Badges</h2>
      <p className="badges-subtitle">
        Collect badges by completing eco-friendly tasks and reaching milestones!
      </p>
      
      <div className="badges-stats">
        <div className="badge-stat">
          <span className="stat-value">{earnedBadges.length}</span>
          <span className="stat-label">Badges Earned</span>
        </div>
        <div className="badge-stat">
          <span className="stat-value">{allBadges.length - earnedBadges.length}</span>
          <span className="stat-label">Badges to Unlock</span>
        </div>
        <div className="badge-stat">
          <span className="stat-value">{Math.round((earnedBadges.length / allBadges.length) * 100)}%</span>
          <span className="stat-label">Completion</span>
        </div>
      </div>
      
      <div className="badges-grid">
        {allBadges.map(badge => {
          const isEarned = hasBadge(badge.id);
          
          return (
            <div 
              key={badge.id} 
              className={`badge-card ${isEarned ? 'earned' : 'locked'}`}
            >
              <div className="badge-icon">
                {isEarned ? badge.icon : '🔒'}
              </div>
              <div className="badge-info">
                <h3 className="badge-name">{badge.name}</h3>
                <p className="badge-description">{badge.description}</p>
                {!isEarned && (
                  <p className="badge-requirement">
                    Requirement: {badge.requirement}
                  </p>
                )}
              </div>
              <div className="badge-status">
                {isEarned ? (
                  <span className="earned-label">Earned!</span>
                ) : (
                  <span className="locked-label">Not yet earned</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Badges;