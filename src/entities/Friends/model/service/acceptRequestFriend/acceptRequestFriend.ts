import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {acceptFriendInvite, addFriendPost, FriendListSchema} from '../../types/friendListSchema';

export const acceptRequestFriend = createAsyncThunk<
    FriendListSchema,
    acceptFriendInvite,
    ThunkConfig<string>
>('friend/addFriend', async (acceptData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.put<FriendListSchema>(`/friends`, acceptData);

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
