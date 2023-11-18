import { StateSchema } from '@/app/providers/StoreProvider';

export const getActualfriends = (state: StateSchema) =>
    state.friendList?.actual_friends || []

export const getReceivedInvites = (state: StateSchema) =>
    state.friendList?.received_invites || []

export const getSentInvites = (state: StateSchema) =>
    state.friendList?.sent_invites || []

export const getError = (state: StateSchema) =>
    state.addCommentForm?.error;

export const getFriendListIsLoading = (state: StateSchema) =>
    state.friendList?.isLoading;