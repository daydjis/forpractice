import {
    getActualfriends,
    getReceivedInvites,
    getSentInvites,
    getError,
    getFriendListIsLoading
} from './model/selectors/getFriendList/getReceivedInvites';
import {getFriendList} from './model/service/getFriendList/getFrineList';
import {friendReducer} from './model/slice/getFriendSlice';
import { Friends } from './model/types/friendListSchema';


export type {Friends}
export {friendReducer}
export {getFriendList}
export {getActualfriends}
export {getReceivedInvites}
export {getSentInvites}
export {getError}
export {getFriendListIsLoading}