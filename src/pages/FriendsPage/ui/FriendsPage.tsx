import React, { Suspense, useState } from 'react';
import { FriendsList, useGetFriend, useGetUsers } from '@/entities/Friends';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { Loader } from '@/shared/ui/deprecated/Loader';
import cls from './FriendsPage.module.scss';

interface FriendsPageProps {
    className?: string;
}
export const FriendsPage = ({ className }: FriendsPageProps) => {
    const { currentData, refetch, isLoading } = useGetFriend(null);
    const { data, status } = useGetUsers(null);
    const [currentTab, setCurrentTab] = useState('Мои друзья');

    const TabsInfo = [
        {
            tabs: 'Мои друзья',
        },
        {
            tabs: 'Полученные заявки в друзья',
        },
        {
            tabs: 'отправленные заявки в друзья',
        },
        {
            tabs: 'добавить в друзья',
        },
    ];

    const handleChangeTabs = (tab: string) => {
        setCurrentTab(tab);
        refetch();
    };

    let content;

    if (currentTab === 'Мои друзья') {
        content = (
            <FriendsList
                actualFriends={currentData?.actual_friends.map((el) => ({
                    ...el.user,
                    acceptId: el.info.id,
                    myfriends: true,
                }))}
                isLoading={isLoading}
            />
        );
    }
    if (currentTab === 'Полученные заявки в друзья') {
        content = (
            <FriendsList
                actualFriends={currentData?.received_invites.map((el) => ({
                    ...el.user,
                    acceptId: el.info.id,
                    recivieInvites: true,
                }))}
                isLoading={isLoading}
            />
        );
    }
    if (currentTab === 'отправленные заявки в друзья') {
        content = (
            <FriendsList
                actualFriends={currentData?.sent_invites.map((el) => ({
                    ...el.user,
                    acceptId: el.info.id,
                    sentInvites: true,
                }))}
                isLoading={isLoading}
            />
        );
    }
    if (currentTab === 'добавить в друзья') {
        content = <FriendsList actualFriends={data} isLoading={isLoading} />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <div className={classNames(cls.headerCard, {}, [])}>
                {TabsInfo.map((item) => (
                    <Button
                        style={{
                            borderRadius: 20,
                            backgroundColor:
                                currentTab === item.tabs
                                    ? '#74a2b2'
                                    : 'transparent',
                        }}
                        key={item.tabs}
                        onClick={() => handleChangeTabs(item.tabs)}
                    >
                        {item.tabs}
                    </Button>
                ))}
            </div>
            {content}
        </Suspense>
    );
};
