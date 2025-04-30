// Mock data service for EcoTask application
// In a real application, these functions would make API calls to a backend server

// Local storage keys
const USERS_KEY = 'ecotask_users';
const CURRENT_USER_KEY = 'ecotask_current_user';
const TASKS_KEY = 'ecotask_tasks';
const COMPLETED_TASKS_KEY = 'ecotask_completed_tasks';
const BADGES_KEY = 'ecotask_badges';

// Initialize mock data if not exists
const initializeMockData = () => {
  // Initialize users if not exists
  if (!localStorage.getItem(USERS_KEY)) {
    const initialUsers = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123', // In a real app, this would be hashed
        points: 350,
        level: 3,
        joinedDate: '2024-12-15'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        points: 520,
        level: 5,
        joinedDate: '2024-12-10'
      },
      {
        id: '3',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        password: 'password123',
        points: 180,
        level: 2,
        joinedDate: '2024-12-20'
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
  }
  
  // Initialize tasks if not exists
  if (!localStorage.getItem(TASKS_KEY)) {
    const initialTasks = [
      {
        id: '1',
        name: 'Use Reusable Water Bottle',
        description: 'Use a reusable water bottle instead of buying plastic bottles.',
        points: 10,
        category: 'Reduce Plastic'
      },
      {
        id: '2',
        name: 'Bike to Work/School',
        description: 'Choose biking over driving to reduce carbon emissions.',
        points: 15,
        category: 'Transportation'
      },
      {
        id: '3',
        name: 'Recycle Paper/Cardboard',
        description: 'Properly sort and recycle paper and cardboard materials.',
        points: 5,
        category: 'Recycling'
      },
      {
        id: '4',
        name: 'Use Cloth Shopping Bags',
        description: 'Bring your own cloth bags for shopping instead of using plastic bags.',
        points: 10,
        category: 'Reduce Plastic'
      },
      {
        id: '5',
        name: 'Compost Food Waste',
        description: 'Compost food scraps instead of throwing them in the trash.',
        points: 20,
        category: 'Waste Reduction'
      },
      {
        id: '6',
        name: 'Use Public Transportation',
        description: 'Take a bus or train instead of driving alone.',
        points: 15,
        category: 'Transportation'
      },
      {
        id: '7',
        name: 'Reduce Shower Time',
        description: 'Take a shorter shower to conserve water.',
        points: 10,
        category: 'Water Conservation'
      },
      {
        id: '8',
        name: 'Plant a Tree or Garden',
        description: 'Plant a tree or start a garden to improve local environment.',
        points: 25,
        category: 'Gardening'
      }
    ];
    localStorage.setItem(TASKS_KEY, JSON.stringify(initialTasks));
  }
  
  // Initialize completed tasks if not exists
  if (!localStorage.getItem(COMPLETED_TASKS_KEY)) {
    const initialCompletedTasks = [
      {
        id: '1',
        userId: '1',
        taskId: '1',
        date: '2025-01-05',
        notes: 'Used my new metal water bottle'
      },
      {
        id: '2',
        userId: '1',
        taskId: '3',
        date: '2025-01-06',
        notes: 'Recycled all paper from my desk'
      },
      {
        id: '3',
        userId: '2',
        taskId: '2',
        date: '2025-01-04',
        notes: 'Biked 5 miles to work'
      },
      {
        id: '4',
        userId: '2',
        taskId: '5',
        date: '2025-01-07',
        notes: 'Started composting in my backyard'
      },
      {
        id: '5',
        userId: '3',
        taskId: '4',
        date: '2025-01-03',
        notes: 'Used cloth bags for grocery shopping'
      }
    ];
    localStorage.setItem(COMPLETED_TASKS_KEY, JSON.stringify(initialCompletedTasks));
  }
  
  // Initialize badges if not exists
  if (!localStorage.getItem(BADGES_KEY)) {
    const initialBadges = [
      {
        id: '1',
        name: 'Eco Novice',
        description: 'Earned 50 points',
        requirement: 'Reach 50 total points',
        icon: '🌟',
        pointThreshold: 50
      },
      {
        id: '2',
        name: 'Green Enthusiast',
        description: 'Earned 100 points',
        requirement: 'Reach 100 total points',
        icon: '🌿',
        pointThreshold: 100
      },
      {
        id: '3',
        name: 'Sustainability Champion',
        description: 'Earned 250 points',
        requirement: 'Reach 250 total points',
        icon: '🌍',
        pointThreshold: 250
      },
      {
        id: '4',
        name: 'Waste Warrior',
        description: 'Completed 10 waste reduction tasks',
        requirement: 'Complete 10 tasks in the waste category',
        icon: '♻️',
        category: 'waste',
        taskCount: 10
      },
      {
        id: '5',
        name: 'Transportation Transformer',
        description: 'Completed 10 eco-friendly transportation tasks',
        requirement: 'Complete 10 tasks in the transportation category',
        icon: '🚲',
        category: 'transportation',
        taskCount: 10
      },
      {
        id: '6',
        name: 'Energy Saver',
        description: 'Completed 10 energy-saving tasks',
        requirement: 'Complete 10 tasks in the energy category',
        icon: '⚡',
        category: 'energy',
        taskCount: 10
      },
      {
        id: '7',
        name: 'Consistent Conservationist',
        description: 'Logged eco-tasks for 7 consecutive days',
        requirement: 'Log at least one task every day for a week',
        icon: '📆',
        streakDays: 7
      }
    ];
    localStorage.setItem(BADGES_KEY, JSON.stringify(initialBadges));
  }
};

// Mock data for the application
// In a real application, this would come from an API

// Eco-friendly tasks
export const tasks = [
  {
    id: '1',
    title: 'Bike to work/school',
    description: 'Use a bicycle instead of a car for your commute',
    points: 10,
    category: 'transportation',
    icon: '🚲'
  },
  {
    id: '2',
    title: 'Use reusable water bottle',
    description: 'Avoid single-use plastic bottles by using a reusable one',
    points: 5,
    category: 'waste',
    icon: '🍶'
  },
  {
    id: '3',
    title: 'Recycle paper/plastic/glass',
    description: 'Properly sort and recycle your waste',
    points: 5,
    category: 'waste',
    icon: '♻️'
  },
  {
    id: '4',
    title: 'Use cloth shopping bags',
    description: 'Bring your own reusable bags for shopping',
    points: 5,
    category: 'waste',
    icon: '👜'
  },
  {
    id: '5',
    title: 'Plant a tree or garden',
    description: 'Contribute to local greenery by planting',
    points: 15,
    category: 'nature',
    icon: '🌱'
  },
  {
    id: '6',
    title: 'Take shorter showers',
    description: 'Reduce water usage by taking showers under 5 minutes',
    points: 5,
    category: 'water',
    icon: '🚿'
  },
  {
    id: '7',
    title: 'Use public transportation',
    description: 'Take a bus or train instead of driving',
    points: 8,
    category: 'transportation',
    icon: '🚌'
  },
  {
    id: '8',
    title: 'Eat a vegetarian meal',
    description: 'Reduce carbon footprint by eating plant-based',
    points: 7,
    category: 'food',
    icon: '🥗'
  },
  {
    id: '9',
    title: 'Turn off lights when not in use',
    description: 'Save electricity by being mindful of lighting',
    points: 3,
    category: 'energy',
    icon: '💡'
  },
  {
    id: '10',
    title: 'Use a reusable coffee cup',
    description: 'Avoid disposable cups by bringing your own',
    points: 5,
    category: 'waste',
    icon: '☕'
  }
];

// User completed tasks (mock data)
export const userTasks = [
  {
    id: '1',
    userId: '1',
    taskId: '2',
    date: '2025-01-05',
    notes: 'Used my new metal water bottle'
  },
  {
    id: '2',
    userId: '1',
    taskId: '3',
    date: '2025-01-05',
    notes: 'Recycled all paper and plastic from the week'
  },
  {
    id: '3',
    userId: '1',
    taskId: '9',
    date: '2025-01-06',
    notes: 'Made sure to turn off all lights before leaving'
  },
  {
    id: '4',
    userId: '1',
    taskId: '8',
    date: '2025-01-07',
    notes: 'Had a delicious vegetable stir fry for dinner'
  },
  {
    id: '5',
    userId: '1',
    taskId: '1',
    date: '2025-01-08',
    notes: 'Biked to campus instead of driving'
  }
];

// Badges that users can earn
export const badges = [
  {
    id: '1',
    name: 'Eco Novice',
    description: 'Earned 50 points',
    requirement: 'Reach 50 total points',
    icon: '🌟',
    pointThreshold: 50
  },
  {
    id: '2',
    name: 'Green Enthusiast',
    description: 'Earned 100 points',
    requirement: 'Reach 100 total points',
    icon: '🌿',
    pointThreshold: 100
  },
  {
    id: '3',
    name: 'Sustainability Champion',
    description: 'Earned 250 points',
    requirement: 'Reach 250 total points',
    icon: '🌍',
    pointThreshold: 250
  },
  {
    id: '4',
    name: 'Waste Warrior',
    description: 'Completed 10 waste reduction tasks',
    requirement: 'Complete 10 tasks in the waste category',
    icon: '♻️',
    category: 'waste',
    taskCount: 10
  },
  {
    id: '5',
    name: 'Transportation Transformer',
    description: 'Completed 10 eco-friendly transportation tasks',
    requirement: 'Complete 10 tasks in the transportation category',
    icon: '🚲',
    category: 'transportation',
    taskCount: 10
  },
  {
    id: '6',
    name: 'Energy Saver',
    description: 'Completed 10 energy-saving tasks',
    requirement: 'Complete 10 tasks in the energy category',
    icon: '⚡',
    category: 'energy',
    taskCount: 10
  },
  {
    id: '7',
    name: 'Consistent Conservationist',
    description: 'Logged eco-tasks for 7 consecutive days',
    requirement: 'Log at least one task every day for a week',
    icon: '📆',
    streakDays: 7
  }
];

// Leaderboard data
export const leaderboard = [
  {
    id: '1',
    name: 'Demo User',
    points: 120,
    level: 2,
    badges: 3
  },
  {
    id: '2',
    name: 'EcoWarrior',
    points: 245,
    level: 5,
    badges: 6
  },
  {
    id: '3',
    name: 'GreenThumb',
    points: 180,
    level: 3,
    badges: 4
  },
  {
    id: '4',
    name: 'EarthDefender',
    points: 310,
    level: 6,
    badges: 7
  },
  {
    id: '5',
    name: 'RecycleQueen',
    points: 150,
    level: 3,
    badges: 3
  }
];

// Mock users
export const users = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    points: 120,
    level: 2,
    joinDate: '2025-01-01'
  }
];

// Helper functions to simulate API calls

// Get all available tasks
export const getAllTasks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasks);
    }, 500);
  });
};

// Get task by ID
export const getTaskById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const task = tasks.find(task => task.id === id);
      resolve(task || null);
    }, 300);
  });
};

// Log a completed task
export const logCompletedTask = (taskData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTask = {
        id: (userTasks.length + 1).toString(),
        ...taskData,
        date: taskData.date || new Date().toISOString().split('T')[0]
      };
      userTasks.push(newTask);
      resolve(newTask);
    }, 600);
  });
};

// Get user's completed tasks
export const getUserCompletedTasks = (userId) => {
  return userTasks.filter(task => task.userId === userId);
};

// Add a custom task
export const addCustomTask = (taskData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTask = {
        id: (tasks.length + 1).toString(),
        ...taskData
      };
      tasks.push(newTask);
      resolve(newTask);
    }, 500);
  });
};

// Get leaderboard data
export const getLeaderboard = (timeFrame = 'weekly') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(leaderboard);
    }, 700);
  });
};

// Get user badges
export const getUserBadges = (userId, points, completedTasks) => {
  // Filter badges based on user's points and completed tasks
  const earnedBadges = badges.filter(badge => {
    // Point threshold badges
    if (badge.pointThreshold && points >= badge.pointThreshold) {
      return true;
    }
    
    // Category-specific badges
    if (badge.category && badge.taskCount) {
      const categoryTasks = completedTasks.filter(task => {
        const taskDetails = getTaskById(task.taskId);
        return taskDetails && taskDetails.category === badge.category;
      });
      return categoryTasks.length >= badge.taskCount;
    }
    
    // Streak badges would require more complex logic with dates
    
    return false;
  });
  
  return earnedBadges;
};

// Calculate user level based on points
export const calculateLevel = (points) => {
  if (points < 50) return 1;
  if (points < 100) return 2;
  if (points < 200) return 3;
  if (points < 350) return 4;
  if (points < 500) return 5;
  if (points < 750) return 6;
  if (points < 1000) return 7;
  return 8;
};