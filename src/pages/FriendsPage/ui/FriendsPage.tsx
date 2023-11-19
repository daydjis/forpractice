import { useEffect } from 'react';
import { FriendsList, getAllUsers, getFriendList } from '@/entities/Friends';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';


interface FriendsPageProps {
    className?: string;
}

export const FriendsPage = ({className}: FriendsPageProps) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getFriendList(''))
        dispatch(getAllUsers(1))
        console.log("render")
    }, [dispatch])


  return (
      <FriendsList/>
  )
};

