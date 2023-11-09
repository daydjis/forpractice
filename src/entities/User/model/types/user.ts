// import { UserRole } from '../consts/userConsts';
// import { FeatureFlags } from '@/shared/types/featureFlags';
// import { JsonSettings } from './jsonSettings';

export interface User {
    // id: string;
    // username: string;
    // avatar?: string;
    // roles?: UserRole[];
    // features?: FeatureFlags;
    // jsonSettings?: JsonSettings;
    id?: number,
    login?: string,
    name?: string,
    lastname?: string,
    age?: number,
    avatar?: string,
    city?: string,
    country?: string
}

export interface UserNew {
    access_token: string;
}

export interface UserSchema {
    authData?: User;

    _inited: boolean;
}
