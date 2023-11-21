import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {addFriendPost, FriendListSchema} from '../../types/friendListSchema';

export const addFriend = createAsyncThunk<
    any,
    addFriendPost,
    ThunkConfig<string>
>('friend/addFriend', async (addData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<FriendListSchema>(`/friends`, addData);

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
