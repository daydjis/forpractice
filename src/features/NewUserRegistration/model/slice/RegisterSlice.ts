import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RegistrationSchema} from '../types/RegistrationSchema';
import {registrationNewUser} from '../services/loginByUsername/registrationNewUser';
import {Country} from "@/entities/Country";

const initialState: RegistrationSchema = {
    isLoading: false,
    error: '',

    login: '',
    lastname: '',
    city: '',
    country: Country.Chechnya,
    avatar: 'https://detalcar.com.ua/image/catalog/avatar.jpg',
    password: '',
    name: '',
    age: 0,
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<string>) => {
            state.login = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setLastname: (state, action: PayloadAction<string>) => {
            state.lastname = action.payload;
        },
        setCountry: (state, action: PayloadAction<Country>) => {
            state.country = action.payload;
        },
        setAge: (state, action: PayloadAction<number>) => {
            state.age = action.payload;
        },
        setAvatar: (state, action: PayloadAction<string>) => {
            state.avatar = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(registrationNewUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(registrationNewUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registrationNewUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: registerActions } = registerSlice;
export const { reducer: registerReducer } = registerSlice;
