import { rtkApi } from '@/shared/api/rtkApi';
import {FriendListSchema} from "@/entities/Friends/model/types/friendListSchema";

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<FriendListSchema, null>({
            query: () => ({
                url: '/friends',
            }),
        }),
    }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
