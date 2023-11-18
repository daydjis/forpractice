import React from 'react';
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./FriendCard.module.scss"
import {Friends} from "@/entities/Friends";
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import {Text} from '@/shared/ui/redesigned/Text/Text'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Card } from '@/shared/ui/redesigned/Card';

interface FriendCardProps {
    className?: string;
    InfoFriends?: Friends;
    isLoading?: boolean;

}

export const FriendCard = ({className, InfoFriends, isLoading}: FriendCardProps) => {
    if (isLoading) {
      return (
          <>
            <Skeleton border="50px" height={100} width={100}/>
            <Skeleton  height={50} width={1200}/>
            <Skeleton  height={50} width={1200}/>
          </>
      )
    }
    
    return (
        <Card className={classNames(cls.FriendCard, {}, [className])} >
            <Avatar src={InfoFriends?.user.avatar} alt={InfoFriends?.user.lastname} size={100}/>
            <div  className={classNames(cls.ContainerFio, {}, [className])}>
                <Text title={`имя: ${ InfoFriends?.user.lastname}`}/>
                <Text title={InfoFriends?.user.name}/>
                <Text title={InfoFriends?.user.login}/>
            </div>
            <div  className={classNames(cls.ContainerInfo, {}, [className])}>
                <Text title={`город: ${  InfoFriends?.user.city}`}/>
                <Text title={`Страна: ${  InfoFriends?.user.country}`}/>
                <Text title={`Возраст: ${  InfoFriends?.user?.age}`}/>
            </div>
        </Card>
    );
};

export default FriendCard