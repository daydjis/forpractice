import React, { useCallback, useState } from 'react';
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./FriendList.module.scss"
import {
addFriend,deleteFriend,getFriendList} from '..';

import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Button} from "@/shared/ui/redesigned/Button";
import {FriendCard} from '@/widgets/FrienListUserCard';
import {acceptRequestFriend} from '../model/service/acceptRequestFriend/acceptRequestFriend';
import { useGetFriend } from '../model/service/apiFriend/FriendsApi';

interface FriendsListProps {
    className?: string;
    allUsers?: any;
}

export const FriendsList = ({className,  allUsers, }: FriendsListProps) => {


    const dispatch = useAppDispatch()

    const [isAccept, setIsAccept] = useState(false)
    const [isAddingFriend, setIsAddingFriend] = useState(false)
    const {data,isLoading } = useGetFriend(null)
    const [
        currentArray,
        setCurrentArray
    ] = useState(data?.actual_friends.map(item=> ({...item.user, acceptId: item.info.friend_id})) || [])
    const Tabs = {
        'Мои друзья': data?.actual_friends.map(item=> ({...item.user, acceptId: item.info.friend_id})),
        'Полученные заявки в друзья': data?.received_invites.map(item=> ({...item.user, acceptId: item.info.friend_id})),
        'отправленные заявки в друзья': data?.sent_invites.map(item=> ({...item.user, acceptId: item.info.friend_id})),
        'добавить в друзья': allUsers
    }

    const handleAddFriend = useCallback((id: number) => {
        // @ts-ignore
        dispatch(addFriend({
            friend_id: id,
            message: 'invite' }
        ))
    },[dispatch])

    const handleDeleteFriend = useCallback((id: number) => {
        if (id) {
            // @ts-ignore
            dispatch(deleteFriend(id))
        }
    }, [dispatch])

    const handleAccept = useCallback((id: number) => {
        if (id) {
            // @ts-ignore
            dispatch(acceptRequestFriend({
                id ,
                accept: true
            }))
        }
    }, [dispatch])
    const handleIsAddNewFriend = (newTabs: string) => {
        if(newTabs ===  'добавить в друзья') {
            setIsAddingFriend(true)
        } else {
            setIsAddingFriend(false)
        }

        if (newTabs === 'Полученные заявки в друзья') {
            setIsAccept(true)
        } else {
            setIsAccept(false)
        }
    }
    const handleChangeTabs = (newTabs: any): void => {
        // @ts-ignore
        setCurrentArray(Tabs[newTabs])
        handleIsAddNewFriend(newTabs)
        // @ts-ignore
        dispatch(getFriendList(null))
    }

    if (data) {
    return (
            <div className={classNames(cls.FriendsPage, {}, [])}>
                <div  className={classNames(cls.headerCard, {}, [])}>
                    {Object.keys(Tabs).map(item =>
                        <Button
                            style={{
                                borderRadius: 0
                            }}
                            size="m"
                            key={item}
                            onClick={()=>handleChangeTabs(item)}
                            title={item}
                        >
                            {item}
                        </Button>)
                    }
                </div>
                <div>
                    {!isAddingFriend && <div className={classNames(cls.Counter, {}, [])}>
                        {`Человек в списке: ${ currentArray?.length}`}
                    </div>}
                    {data && currentArray?.map(item => (
                        <FriendCard
                                key={item.user?.id}
                                handleAccept={handleAccept}
                                handleAddFriend={handleAddFriend}
                                accept={isAccept}
                                handleDeleteFriend={handleDeleteFriend}
                                isLoading={isLoading}
                                isAddingNew={isAddingFriend}
                                user={item}
                            />
                     ))}
                </div>
            </div>
    );
};}

