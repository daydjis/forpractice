import { createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs';
import { User, userActions ,UserNew} from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    UserNew,
    LoginByUsernameProps,
    ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    // "TODO - поместить в конфиг и сделать КРАСUВ0"
    const options = {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
    };

    try {
        const response = await extra.api.post<UserNew>(
            '/users/login',
            qs.stringify(authData),
            options

        );

        dispatch(userActions.setAuthData(response.data));


        if (response.data.access_token) {
            const auth = await extra.api.get<User>(
                '/users/me',
            )

            dispatch(userActions.setAuthUserData(auth.data))
        }

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
