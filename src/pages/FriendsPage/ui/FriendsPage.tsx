import { useEffect } from 'react';
import {
    friendReducer,
    FriendsList,
    getActualfriends,
    getAllUsers, getAllUsersList,
    getFriendList, getReceivedInvites, getSentInvites,
    getUsersReducer
} from '@/entities/Friends';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {useSelector} from "react-redux";


interface FriendsPageProps {
    className?: string;
}
const reducers: ReducersList = {
    friendList: friendReducer,
    getUsers: getUsersReducer
};

export const FriendsPage = ({className}: FriendsPageProps) => {
    const dispatch = useAppDispatch()
    const actualFriends = useSelector(getActualfriends)
    const recevietInvites = useSelector(getReceivedInvites)
    const sentInvites = useSelector(getSentInvites)
    const allUsers = useSelector(getAllUsersList)

    useEffect(() => {
        dispatch(getFriendList(''))
        dispatch(getAllUsers(1))
    }, [dispatch])


  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <FriendsList allUsers={allUsers} actualFriends={actualFriends} recevietInvites={recevietInvites} sentInvites={sentInvites}/>
      </DynamicModuleLoader>
  )
};

