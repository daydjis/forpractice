import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions ,UserNew} from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface registrationNewUserProps {

}

export const registrationNewUser = createAsyncThunk<
    UserNew,
    registrationNewUserProps,
    ThunkConfig<string>
>('reg/registrationNewUser', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<UserNew>(
            '/users/new',
            authData,
        );

        dispatch(userActions.setAuthData(response.data));


        if (response.data.access_token) {
            const auth = await extra.api.get<User>(
                '/users/new',
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
