import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    LOCAL_STORAGE_LAST_DESIGN_KEY,
    USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localstorage';
import {UserSchema, User, UserNew} from '../types/user';
// import { saveJsonSettings } from '../services/saveJsonSettings';
import { initAuthData } from '../services/initAuthData';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, { payload }: PayloadAction<UserNew>) => {
            // setFeatureFlags(payload.features);
            localStorage.setItem(USER_LOCALSTORAGE_KEY, String(`Bearer ${  payload.access_token}`));
            localStorage.setItem(
                LOCAL_STORAGE_LAST_DESIGN_KEY,
                // payload.features?.isAppRedesigned ? 'new' : 'old',
                'new'
            );
        },

        setAuthUserData: (state, {payload}: PayloadAction<User>) => {
            state.authData = payload
        },

        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(
        //     saveJsonSettings.fulfilled,
        //     (state, { payload }: PayloadAction<JsonSettings>) => {
        //         if (state.authData) {
        //             // state.authData.jsonSettings = payload;
        //         }
        //     },
        // );
        builder.addCase(
            initAuthData.fulfilled,
            (state, { payload }: PayloadAction<User>) => {
                state.authData = payload;
                // setFeatureFlags(payload.features);
                state._inited = true;
            },
        );
        builder.addCase(initAuthData.rejected, (state) => {
            state._inited = true;
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
