import React, { useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './FriendList.module.scss';
import { addFriend, deleteFriend } from '..';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { FriendCard } from '@/shared/ui/redesigned/FriendCard';
import { acceptRequestFriend } from '../model/service/acceptRequestFriend/acceptRequestFriend';
import { User } from '@/entities/User';
import { Input } from '@/shared/ui/redesigned/Input';

interface FriendsListProps {
    className?: string;
    actualFriends?: Array<User>;
    isLoading: boolean;
}

interface Tabs {
    tabs: string;
    value: Array<User> | undefined;
}

export const FriendsList = ({
    actualFriends,
    isLoading,
    className,
}: FriendsListProps) => {
    const dispatch = useAppDispatch();

    const handleAddFriend = useCallback(
        (id: number) => {
            dispatch(
                // @ts-ignore
                addFriend({
                    friend_id: id,
                    message: 'invite',
                }),
            );
        },
        [dispatch],
    );

    const handleDeleteFriend = useCallback(
        (id: number) => {
            if (id) {
                // @ts-ignore
                dispatch(deleteFriend(id));
            }
        },
        [dispatch],
    );

    const handleAccept = useCallback(
        (userId: number) => {
            if (userId) {
                dispatch(
                    // @ts-ignore
                    acceptRequestFriend({
                        id: userId,
                        accept: true,
                    }),
                );
            }
        },
        [dispatch],
    );

    return (
        <div className={classNames(cls.FriendsPage, {}, [])}>
            <div>
                <div className={classNames(cls.Counter, {}, [])}>
                    {`Человек в списке: ${actualFriends?.length}`}
                </div>
                <Input
                    onChange={() => {}}
                    placeholder="Введите имя пользователя"
                />
                {actualFriends?.map((userinfo) => (
                    <FriendCard
                        key={userinfo.id}
                        handleAccept={handleAccept}
                        handleAddFriend={handleAddFriend}
                        handleDeleteFriend={handleDeleteFriend}
                        isLoading={isLoading}
                        user={userinfo}
                    />
                ))}
            </div>
        </div>
    );
};
