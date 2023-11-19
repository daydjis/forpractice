import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {getUsersAction} from '../../slice/getAllUsers';
import {User} from "@/entities/User";

export const getAllUsers = createAsyncThunk<
    User[],
    number,
    ThunkConfig<string>
>('friend/getAllUsers', async (_, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<User[]>(`/users`,);

        dispatch(getUsersAction.setUser(response.data))

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
