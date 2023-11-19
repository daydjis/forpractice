import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {FriendListSchema} from '../../types/friendListSchema';

export const deleteFriend = createAsyncThunk<
    FriendListSchema,
    number,
    ThunkConfig<string>
>('friend/deleteFriend', async (id, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.delete<FriendListSchema>(`/friends/${id}`,);


        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
