import React, { useCallback, useState, useMemo } from 'react';
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./FriendList.module.scss"
import {
    addFriend, deleteFriend,
} from '..';
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {FriendCard} from '@/widgets/FrienListUserCard/ui';
import {acceptRequestFriend} from '../model/service/acceptRequestFriend/acceptRequestFriend';
import { Button } from '@/shared/ui/redesigned/Button';
import { User } from '@/entities/User';
import { Input } from '@/shared/ui/redesigned/Input';

interface FriendsListProps {
    className?: string;
    actualFriends?: Array<User>;
    receivedInvites?:  Array<User>;
    sentInvites?: Array<User>;
    allUser?: Array<User>;
    isLoading: boolean;
    refreshFriend?: any;
}

interface Tabs {
    tabs: string,
    value: Array<User> | undefined
}

export const FriendsList = (
    {
        refreshFriend,
        className,
        actualFriends,
        receivedInvites,
        sentInvites, allUser,
        isLoading
    }: FriendsListProps) => {
    const dispatch = useAppDispatch()
    const [isAccept, setIsAccept] = useState(false)
    const [currentTab, setCurrentTab] = useState('Мои друзья')
    const [isAddingFriend, setIsAddingFriend] = useState(false)
    const [
        currentArray,
        setCurrentArray
    ] = useState(actualFriends)

    const TabsInfo: Tabs[] = useMemo(()=> ([
        {
            tabs: 'Мои друзья',
            value: actualFriends,
        },
        {
            tabs: 'Полученные заявки в друзья',
            value:  receivedInvites
        },
        {
            tabs:  'отправленные заявки в друзья',
            value: sentInvites
        },
        {
            tabs:'добавить в друзья',
            value: allUser
        }
    ]) ,[allUser, actualFriends, receivedInvites, sentInvites])

    const handleAddFriend = useCallback((id: number) => {
        // @ts-ignore
        dispatch(addFriend({
            friend_id: id,
            message: 'invite' }
        ))
    },[dispatch])

    const handleDeleteFriend = useCallback((id: number) => {
        if (id) {
            dispatch(deleteFriend(id))
        }
        refreshFriend()
    }, [dispatch])

    const handleAccept = useCallback((userId: number) => {
        if (userId) {
            // @ts-ignore
            dispatch(acceptRequestFriend({
                id: userId ,
                accept: true
            }))
            refreshFriend()
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
    const handleChangeTabs = (newTabs: Tabs ): void => {
        setCurrentTab(newTabs.tabs)
        setCurrentArray(newTabs?.value)
        handleIsAddNewFriend(newTabs?.tabs)
        refreshFriend()
    }

    return (
            <div className={classNames(cls.FriendsPage, {}, [])}>
                <div  className={classNames(cls.headerCard, {}, [])}>
                    {TabsInfo.map(item =>
                        <Button
                            style={
                            {
                                borderRadius: 0,
                                backgroundColor: currentTab === item.tabs ? '#74a2b2' : 'transparent',
                            }
                        }
                            key={item.tabs}
                            onClick={()=>handleChangeTabs(item)}
                        >
                            {item.tabs}
                        </Button>)
                    }
                </div>
                <div>
                   <div className={classNames(cls.Counter, {}, [])}>
                        {`Человек в списке: ${ currentArray?.length}`}
                    </div>
                    <Input onChange={()=>{}} placeholder='Введите имя пользователя'/>
                    {currentArray?.map(userinfo => (
                        <FriendCard
                                key={userinfo.id}
                                handleAccept={handleAccept}
                                handleAddFriend={handleAddFriend}
                                accept={isAccept}
                                handleDeleteFriend={handleDeleteFriend}
                                isLoading={isLoading}
                                isAddingNew={isAddingFriend}
                                user={userinfo}
                            />
                     ))}
                </div>
            </div>
    );
};

