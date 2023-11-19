import React, {useCallback, useState} from 'react';
import {useTranslation} from "react-i18next";
import { useSelector } from 'react-redux';
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./FriendList.module.scss"
import {DynamicModuleLoader, ReducersList} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {friendReducer,getUsersReducer,
    getActualfriends,
    getAllUsersList, getError, getFriendListIsLoading,
    getReceivedInvites,
    getSentInvites
,addFriend,deleteFriend,getFriendList} from '..';

import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Button} from "@/shared/ui/redesigned/Button";
import {FriendCard} from '@/widgets/FrienListUserCard';

interface FriendsListProps {
    className?: string;
}

export const FriendsList = ({className}: FriendsListProps) => {

    const reducers: ReducersList = {
        friendList: friendReducer,
        getUsers: getUsersReducer
    };

    const dispatch = useAppDispatch()
    const actualFriends = useSelector(getActualfriends)
    const recevietInvites = useSelector(getReceivedInvites)
    const sentInvites = useSelector(getSentInvites)
    const allUsers = useSelector(getAllUsersList)
    const error = useSelector(getError)
    const isLoading = useSelector(getFriendListIsLoading)


    const {t} = useTranslation()
    const [isAccept, setIsAccept] = useState(false)
    const [isAddingFriend, setIsAddingFriend] = useState(false)
    const [currentArray, setCurrentArray] = useState([])

    const Tabs = {
        'Мои друзья': actualFriends,
        'Полученные заявки в друзья': recevietInvites,
        'отправленные заявки в друзья': sentInvites,
        'добавить в друзья': allUsers
    }
    const handleAddFriend = useCallback((id: number) => {
        dispatch(addFriend({
            friend_id: id,
            message: 'invite'
        }))
        dispatch(getFriendList(''))
    },[dispatch])

    const handleDeleteFriend = useCallback((id: number) => {
        if (id) {
            dispatch(deleteFriend(id))
            dispatch(getFriendList(''))
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
        console.log(Tabs[newTabs])
        // @ts-ignore
        setCurrentArray(Tabs[newTabs])
        handleIsAddNewFriend(newTabs)
        dispatch(getFriendList(''))
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
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
                        {`Человек в списке: ${ currentArray.length}`}
                    </div>}
                    <FriendCard
                        handleAddFriend={handleAddFriend}
                        accept={isAccept}
                        handleDeleteFriend={handleDeleteFriend}
                        isLoading={isLoading}
                        isAddingNew={isAddingFriend}
                        list={currentArray}
                    />
                </div>
            </div>
        </DynamicModuleLoader>
    );
};

