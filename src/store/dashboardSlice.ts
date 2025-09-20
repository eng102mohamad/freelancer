import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserDistribution {
  customers: number
  managers: number
  admins: number
}

interface ProjectStatus {
  completed: number
  inProgress: number
  pending: number
  cancelled: number
}

interface Activity {
  id: string
  message: string
  timestamp: string
}

// Add interface for Project
export interface Project {
  id: number;
  title: string;
  client: string;
  startDate: string;
  status: 'Completed' | 'Active' | 'Paused';
  progress: number;
}

// Update state to include projects
interface DashboardState {
  totalUsers: number;
  activeProjects: number;
  totalTransactions: number;
  userDistribution: UserDistribution;
  projectStatus: ProjectStatus;
  recentActivities: Activity[];
  projects: Project[]; // Add projects list
}

interface User {
  id: number
  name: string
  email: string
  role: 'Customer' | 'Developer' | 'Manager'
  status: 'Active' | 'Inactive'
  avatar: string
}

interface UsersState {
  users: User[]
}

const initialState: DashboardState = {
  totalUsers: 1234,
  activeProjects: 567,
  totalTransactions: 87654,
  userDistribution: {
    customers: 60,
    managers: 10,
    admins: 30
  },
  projectStatus: {
    completed: 450,
    inProgress: 320,
    pending: 180,
    cancelled: 50
  },
  recentActivities: [
    {
      id: '1',
      message: 'New user Ahmed Ali registered',
      timestamp: '2 minutes ago'
    },
    {
      id: '2', 
      message: 'Project "App Development" status updated to Active',
      timestamp: '15 minutes ago'
    },
    {
      id: '3',
      message: 'Invoice #1024 has been paid',
      timestamp: '30 minutes ago'
    },
    {
      id: '4',
      message: '$500 deposited into user wallet #201',
      timestamp: '1 hour ago'
    },
    {
      id: '5',
      message: 'New project "Dashboard App" assigned',
      timestamp: '2 hours ago'
    }
  ],
  projects: [ 
    {
      id: 1,
      title: "Mobile App",
      client: "Tech Company",
      startDate: "2023-01-15",
      status: "Active",
      progress: 75
    },
  ]
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateTotalUsers: (state, action: PayloadAction<number>) => {
      state.totalUsers = action.payload
    },
    updateActiveProjects: (state, action: PayloadAction<number>) => {
      state.activeProjects = action.payload
    },
    updateTotalTransactions: (state, action: PayloadAction<number>) => {
      state.totalTransactions = action.payload
    },
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.recentActivities.unshift(action.payload)
      if (state.recentActivities.length > 10) {
        state.recentActivities.pop()
      }
    },
    // Add new functions for project management
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
      state.activeProjects += 1;
      
      // Add new activity
      state.recentActivities.unshift({
        id: Date.now().toString(),
        message: `New project added: ${action.payload.title}`,
        timestamp: 'Just now'
      });
      
      if (state.recentActivities.length > 10) {
        state.recentActivities.pop();
      }
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
        
        // Add new activity
        state.recentActivities.unshift({
          id: Date.now().toString(),
          message: `Project updated: ${action.payload.title}`,
          timestamp: 'Just now'
        });
        
        if (state.recentActivities.length > 10) {
          state.recentActivities.pop();
        }
      }
    },
    deleteProject: (state, action: PayloadAction<number>) => {
      const projectIndex = state.projects.findIndex(p => p.id === action.payload);
      if (projectIndex !== -1) {
        const project = state.projects[projectIndex];
        state.projects.splice(projectIndex, 1);
        
        if (project.status === 'Active') {
          state.activeProjects -= 1;
        }
        
        // Add new activity
        state.recentActivities.unshift({
          id: Date.now().toString(),
          message: `Project deleted: ${project.title}`,
          timestamp: 'Just now'
        });
        
        if (state.recentActivities.length > 10) {
          state.recentActivities.pop();
        }
      }
    }
  }
})

export const { 
  updateTotalUsers, 
  updateActiveProjects, 
  updateTotalTransactions, 
  addActivity,
  addProject,
  updateProject,
  deleteProject
} = dashboardSlice.actions;

export default dashboardSlice.reducer