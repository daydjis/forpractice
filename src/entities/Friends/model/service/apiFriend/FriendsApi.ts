import { rtkApi } from '@/shared/api/rtkApi';
import { FriendListSchema } from '../../..';

const friendApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getFriend: build.query<FriendListSchema, null>({
            query: () => ({
                url: '/friends',
            }),
        }),
    }),
});

export const useGetFriend = friendApi.useGetFriendQuery;