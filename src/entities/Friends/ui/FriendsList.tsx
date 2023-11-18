import React from 'react';
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./FriendsList.module.scss"

interface FriendsListProps {
    className?: string;
}

export const FriendsList = ({className}: FriendsListProps) => {
    return (
        <div className={classNames(cls.FriendsList, {}, [className])} />
    );
};

