import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions ,UserNew} from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface registrationNewUserProps {
    login?: string,
    name?: string,
    lastname?: string,
    age?: number,
    avatar?: string,
    city?: string,
    country?: string,
    password?: string,
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
            {
                login: authData?.login,
                name: authData?.name,
                lastname:  authData?.lastname,
                age:  authData?.age,
                avatar:  authData?.avatar,
                city:  authData?.city,
                password:  authData?.password,
                country:  authData?.country
            },
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
