import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getFriendList,
    friendReducer,
    getActualfriends,
    getError,
    getReceivedInvites,
    getSentInvites, getFriendListIsLoading
} from '@/entities/Friends';
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './FriendsPage.module.scss'
import {FriendCard} from "@/widgets/FrienListUserCard";
import { Button } from '@/shared/ui/redesigned/Button';


interface FriendsPageProps {
    className?: string;
}

export const FriendsPage = ({className}: FriendsPageProps) => {

    const reducers: ReducersList = {
        friendList: friendReducer,
    };

    const dispatch = useAppDispatch()
    const actualFriends = useSelector(getActualfriends)
    const recevietInvites = useSelector(getReceivedInvites)
    const sentInvites = useSelector(getSentInvites)
    const error = useSelector(getError)
    const isLoading = useSelector(getFriendListIsLoading)

    const {t} = useTranslation()

    const [isAddingFriend, setIsAddingFriend] = useState(false)
    const [currentArray, setCurrentArray] = useState(actualFriends)

    const Tabs = {
        'Мои друзья': actualFriends,
        'Возможные друзья': recevietInvites,
        'отправленные заявки в друзья': sentInvites,
        'добавить в друзья': []
    }

    const handleIsAddNewFriend = (newTabs: string) => {
       if(newTabs ===  'добавить в друзья') {
           setIsAddingFriend(true)
       } else {
           setIsAddingFriend(false)
       }
    }
    const handleChangeTabs = (newTabs: any): void => {
        // @ts-ignore
        setCurrentArray(Tabs[newTabs])
        handleIsAddNewFriend(newTabs)
    }

    useEffect(() => {
        dispatch(getFriendList(''))
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
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
                    <FriendCard isLoading={isLoading} isAddingNew={isAddingFriend} list={currentArray}/>
                </div>
            </div>
        </DynamicModuleLoader>
    );
};

