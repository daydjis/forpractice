import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/entities/User';
import {getAllUsers} from '../service/getAllusers/getAllusers';
import {getUsersSchema} from '../types/friendListSchema';

const initialState: getUsersSchema = {
    isLoading: false,
    error: '',
    userList: []
};

export const getUsersListSlice = createSlice({
    name: 'ListUsers',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User[]>) => {
            state.userList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: getUsersAction } = getUsersListSlice;
export const { reducer: getUsersReducer } = getUsersListSlice;
