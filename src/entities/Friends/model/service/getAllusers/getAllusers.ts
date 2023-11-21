import { User } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';

const usersApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        allUsers: build.query<User[], null>({
            query: () => ({
                url: '/users',
            }),
        }),
    }),
});

export const useGetUsers = usersApi.useAllUsersQuery