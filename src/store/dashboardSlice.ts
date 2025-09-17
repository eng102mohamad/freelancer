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

interface DashboardState {
  totalUsers: number
  activeProjects: number
  totalTransactions: number
  userDistribution: UserDistribution
  projectStatus: ProjectStatus
  recentActivities: Activity[]
}

// إضافة واجهة للمشروع
export interface Project {
  id: number;
  title: string;
  client: string;
  startDate: string;
  status: 'مكتمل' | 'نشط' | 'متوقف';
  progress: number;
}

// تحديث الحالة لإضافة المشاريع
interface DashboardState {
  totalUsers: number;
  activeProjects: number;
  totalTransactions: number;
  userDistribution: UserDistribution;
  projectStatus: ProjectStatus;
  recentActivities: Activity[];
  projects: Project[]; // إضافة قائمة المشاريع
}

interface User {
  id: number
  name: string
  email: string
  role: 'عميل' | 'مطور' | 'مدير'
  status: 'نشط' | 'غير نشط'
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
      message: 'تم تسجيل مستخدم جديد أحمد علي',
      timestamp: 'منذ دقيقتين'
    },
    {
      id: '2', 
      message: 'تم تحديث حالة المشروع "بناء التطبيق" إلى النشط',
      timestamp: 'منذ 15 دقيقة'
    },
    {
      id: '3',
      message: 'تم شكر لا يحتوي على رقم 1024',
      timestamp: 'منذ 30 دقيقة'
    },
    {
      id: '4',
      message: 'تم إيداع 500$ في محفظة المستخدم 201',
      timestamp: 'منذ ساعة واحدة'
    },
    {
      id: '5',
      message: 'البحث المرافق على مشروع جديد "تطبيق لوحة تحكم"',
      timestamp: 'منذ ساعتين'
    }
  ],
  projects: [ // إضافة بعض المشاريع الافتراضية
    {
      id: 1,
      title: "تطبيق الهاتف",
      client: "شركة التقنية",
      startDate: "2023-01-15",
      status: "نشط",
      progress: 75
    },
    {
      id: 2,
      title: "موقع الشركة",
      client: "مؤسسة النجاح",
      startDate: "2023-02-20",
      status: "مكتمل",
      progress: 100
    },
    {
      id: 3,
      title: "نظام إدارة المحتوى",
      client: "أكاديمية التعلم",
      startDate: "2023-03-10",
      status: "متوقف",
      progress: 30
    }
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
    // إضافة دوال جديدة لإدارة المشاريع
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
      state.activeProjects += 1;
      
      // إضافة نشاط جديد
      state.recentActivities.unshift({
        id: Date.now().toString(),
        message: `تم إضافة مشروع جديد: ${action.payload.title}`,
        timestamp: 'الآن'
      });
      
      if (state.recentActivities.length > 10) {
        state.recentActivities.pop();
      }
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
        
        // إضافة نشاط جديد
        state.recentActivities.unshift({
          id: Date.now().toString(),
          message: `تم تحديث مشروع: ${action.payload.title}`,
          timestamp: 'الآن'
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
        
        if (project.status === 'نشط') {
          state.activeProjects -= 1;
        }
        
        // إضافة نشاط جديد
        state.recentActivities.unshift({
          id: Date.now().toString(),
          message: `تم حذف مشروع: ${project.title}`,
          timestamp: 'الآن'
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

