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


    const [currentTab, setCurrentTab] = useState("actualFriends")
    const [currentArray, setcurrentArray] = useState(actualFriends)

    const Tabs = {
        'Мои друзья': 'actualFriends',
        'Возможные друзья': 'recevietInvites',
        'отправленные в друзья': 'sentInvites',
    }
    const handleChange = () => {
        let content;

        if (currentTab === "actualFriends") {
            content = (recevietInvites.map(user => <FriendCard
                    key={user.user.id}
                    isLoading={isLoading}
                    InfoFriends={user}
                />
            ))
        }
        if (currentTab === "recevietInvites") {
            content = (recevietInvites.map(user => <FriendCard
                    key={user.user.id}
                    isLoading={isLoading}
                    InfoFriends={user}
                />
            ))
        }
        if (currentTab === "sentInvites") {
            content = (sentInvites.map(user => <FriendCard
                    key={user.user.id}
                    isLoading={isLoading}
                    InfoFriends={user}
                />
            ))
        }
    }
    const handleChangeTabs = (newTabs: string): void => {
        // @ts-ignore
        setCurrentTab(Tabs[newTabs])
    }

    useEffect(() => {
        dispatch(getFriendList(''))
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <div className={classNames(cls.FriendsPage, {}, [])}>
                <div  className={classNames(cls.headerCard, {}, [])}>
                    {Object.keys(Tabs).map(item =>
                        <Button key={item} onClick={() =>
                            handleChangeTabs(item)}>{item}
                        </Button>)}
                </div>
                <div>
                    <div className={classNames(cls.headerCard, {}, [])}>
                        <div  className={classNames(cls.Counter, {}, [])}>{currentArray.length}</div>
                    </div>
                    {content}
                </div>
            </div>
        </DynamicModuleLoader>
    );
};

