import {Country} from "@/entities/Country";

export interface RegistrationSchema {
    error?: string,
    isLoading?: boolean,
    login?: string,
    password?: string,
    name?: string,
    lastname?: string,
    age?: number,
    avatar?: string,
    city?: string,
    country?: Country
}
