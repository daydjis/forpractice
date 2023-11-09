import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/userConsts';

export const getUserRoles = (state: StateSchema) => state.user.authData;

export const isUserAdmin = createSelector(getUserRoles, (roles) =>
    // Boolean(roles?.includes(UserRole.ADMIN)),
    true
);
export const isUserManager = createSelector(getUserRoles, (roles) =>
    // Boolean(roles?.includes(UserRole.MANAGER)),
    true
);
