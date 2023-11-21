import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const deleteFriend = createAsyncThunk<
    any,
    number,
    ThunkConfig<string>
>('friend/deleteFriend', async (id, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.delete(`/friends/${id}`,);


        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
