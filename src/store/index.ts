import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from './dashboardSlice'
import userReducer from './userSlice'
import financeReducer from './financeSlice'
import reviewsReducer from './reviewsSlice'
import ticketsReducer from './ticketsSlice'
import settingsReducer from './settingsSlice'

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    users: userReducer,
    finance: financeReducer,
    reviews: reviewsReducer,
    tickets: ticketsReducer,
    settings: settingsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch