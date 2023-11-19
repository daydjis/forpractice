
export interface User {
    id?: number,
    login?: string,
    name?: string,
    lastname?: string,
    age?: number,
    avatar?: string,
    city?: string,
    country?: string,
    acceptId?: number,
}

export interface UserNew {
    access_token: string;
}

export interface UserSchema {
    authData?: User;

    _inited: boolean;
}
