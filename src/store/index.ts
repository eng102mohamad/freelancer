import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from './dashboardSlice'
import userReducer from './userSlice'
import financeReducer from './financeSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    users: userReducer,
    finance: financeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch