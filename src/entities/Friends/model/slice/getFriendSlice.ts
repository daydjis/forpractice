import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {FriendListSchema } from '../types/friendListSchema';
import {getFriendList} from '../service/getFriendList/getFrineList';

const initialState: FriendListSchema = {
    isLoading: false,
    error: '',
    actual_friends: [],
    sent_invites: [],
    received_invites: [],
};

export const friendSlice = createSlice({
    name: 'Friend',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<FriendListSchema>) => {
            state.actual_friends = action.payload.actual_friends;
            state.received_invites = action.payload.received_invites;
            state.sent_invites = action.payload.sent_invites;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFriendList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(getFriendList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.actual_friends = action.payload.actual_friends;
                state.received_invites = action.payload.received_invites;
                state.sent_invites = action.payload.sent_invites;
            })
            .addCase(getFriendList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: friendAction } = friendSlice;
export const { reducer: friendReducer } = friendSlice;
