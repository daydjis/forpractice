import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {FriendListSchema} from '../../types/friendListSchema';
import {friendAction} from '../../slice/getFriendSlice';


export const getFriendList = createAsyncThunk<
    FriendListSchema,
    string,
    ThunkConfig<string>
>('friend/getFriendList', async (UserNew, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<FriendListSchema>('/friends',);

        dispatch(friendAction.setUser(response.data));


        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
