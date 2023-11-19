import { useEffect } from 'react';
import {friendReducer, FriendsList, getAllUsers, getFriendList, getUsersReducer} from '@/entities/Friends';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";


interface FriendsPageProps {
    className?: string;
}
const reducers: ReducersList = {
    friendList: friendReducer,
    getUsers: getUsersReducer
};

export const FriendsPage = ({className}: FriendsPageProps) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getFriendList(''))
        dispatch(getAllUsers(1))
    }, [dispatch])


  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <FriendsList/>
      </DynamicModuleLoader>
  )
};

