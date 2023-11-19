import { StateSchema } from '@/app/providers/StoreProvider';

export const getActualfriends = (state: StateSchema) =>
    state.friendList?.actual_friends.map(item => ({...item.user,  ...{acceptId: item.user.id}})) || []

export const getReceivedInvites = (state: StateSchema) =>
    state.friendList?.received_invites.map(item =>  ({...item.user, ...{acceptId: item.user.id} })) || []

export const getSentInvites = (state: StateSchema) =>
    state.friendList?.sent_invites.map(item => ({...item.user,...{acceptId: item.user.id}})) || []

export const getError = (state: StateSchema) =>
    state.addCommentForm?.error;

export const getFriendListIsLoading = (state: StateSchema) =>
    state.friendList?.isLoading;

export  const getAllUsersList = (state: StateSchema) =>
    state.getUsers?.userList

export  const getAllUsersLoading = (state: StateSchema) =>
    state.getUsers?.isLoading

export  const getAllUsersError = (state: StateSchema) =>
    state.getUsers?.error
