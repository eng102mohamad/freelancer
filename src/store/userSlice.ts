import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'عميل' | 'مطور' | 'مدير';
    status: 'نشط' | 'غير نشط';
    avatar: string;
}

interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [
        {
            id: 1,
            name: 'علي أحمد',
            email: 'ali.ahmad@example.com',
            role: 'عميل',
            status: 'نشط',
            avatar: '/avatars/avatar1.png'
        },  
        {   
            id: 2,
            name: 'فادي محمود',
            email: 'fadi.mahmoud@example.com',
            role: 'مطور',
            status: 'نشط',
            avatar: '/avatars/avatar2.png'
        },  
        {   
            id: 3,
            name: 'ليلى خالد',
            email: 'layla.khalid@example.com',
            role: 'عميل',
            status: 'غير نشط',
            avatar: '/avatars/avatar3.png'
        },  
        {   
            id: 4,
            name: 'سامي ناصر',
            email: 'sami.nasser@example.com',
            role: 'مطور',
            status: 'نشط',
            avatar: '/avatars/avatar4.png'
        },  
        {   
            id: 5,
            name: 'نورا سعيد',
            email: 'nora.saeed@example.com',
            role: 'عميل',
            status: 'نشط',
            avatar: '/avatars/avatar5.png'
        }
    ],
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        setUsersLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setUsersError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const { addUser, updateUser, deleteUser, setUsersLoading, setUsersError } = userSlice.actions;
export default userSlice.reducer;