import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserRegister = (state: StateSchema) =>
    state?.register || {};
