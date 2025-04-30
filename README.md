# ECOtracker - Sustainable Habit Tracker
## Overview
ECOtracker is a full-stack web application designed to encourage and track environmentally friendly habits. Users can log eco-friendly tasks, earn points, and track their progress over time. The application features a leaderboard for friendly competition and a badge system for achieving sustainability milestones.

## Features
- Task Logging : Log eco-friendly activities like biking instead of driving, using reusable bottles, or recycling
- Points System : Earn points for each eco-friendly action
- Progress Tracking : View your environmental impact over time
- Badges : Earn badges for reaching sustainability milestones
- Leaderboard : Compete with others in eco-friendly activities
## Tech Stack
- Frontend : React.js
- State Management : React Context API
- Routing : React Router
- Styling : CSS
- Data Handling : Mock data services (simulated backend)

**Project Structure**
ecotask-client/
├── public/             # Static files
├── src/                # Source files
│   ├── components/     # React components
│   │   ├── Auth/       # Authentication components
│   │   ├── Dashboard/  # Dashboard components
│   │   ├── Layout/     # Layout components (Navbar, Footer)
│   │   ├── Leaderboard/# Leaderboard components
│   │   └── Tasks/      # Task-related components
│   ├── services/       # API and mock data services
│   ├── App.js          # Main application component
│   ├── App.css         # Main styles
│   └── index.js        # Application entry point
└── package.json        # Project dependencies and scripts
## Installation
### Prerequisites
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
### Setup
1. Clone the repository
   git clone https://github.com/yourusername/ECOtracker.git
   cd ECOtracker
## Usage
- Dashboard : View your eco-stats, recent activities, and earned badges
- Tasks : Browse available eco-tasks, filter by category, and log completed tasks
- Leaderboard : See how you rank compared to other users
- Profile : Track your progress and view all earned badges
## Future Enhancements
- Backend integration with a real database
- User authentication system
- Mobile application
- Social sharing features
- Community challenges
## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Environmental data and task impact calculations based on research from environmental organizations
- Inspired by the growing need for individual action on climate change
