// import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

export interface Profile {
    id?: number,
    login?: string,
    name?: string,
    lastname?: string,
    age?: number,
    avatar?: string,
    city?: string,
    country?: Country
}
