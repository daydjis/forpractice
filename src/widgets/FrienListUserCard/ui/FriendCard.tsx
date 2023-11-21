import React, {memo} from 'react';
import { useTranslation } from 'react-i18next';
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./FriendCard.module.scss"
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import {Text} from '@/shared/ui/redesigned/Text/Text'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {User} from "@/entities/User";

interface FriendCardProps {
    accept?: boolean;
    className?: string;
    isLoading?: boolean;
    user?: User;
    isAddingNew: boolean;
    handleDeleteFriend: (id: number) => void
    handleAddFriend: (id: number) => void
    handleAccept: (id: number) => void
}

export const FriendCard = (
    {
        className,
        accept,
        isLoading,
        user,
        handleAddFriend,
        isAddingNew,
        handleDeleteFriend,
        handleAccept
}: FriendCardProps) => {
    const dispatch = useAppDispatch()

    const {t} = useTranslation()

    if (isLoading) {
      return (
          <>
              <Skeleton border="50px" height={100} width={100}/>
              <Skeleton  height={50} width={1200}/>
              <Skeleton  height={50} width={1200}/>
              <Skeleton border="50px" height={100} width={100}/>
              <Skeleton  height={50} width={1200}/>
              <Skeleton  height={50} width={1200}/>
              <Skeleton border="50px" height={100} width={100}/>
              <Skeleton  height={50} width={1200}/>
              <Skeleton  height={50} width={1200}/>
          </>
      )
    }
    if (user) {
        return (
        <div style={{marginTop: 20}} >
            {user && <Input onChange={()=>{}} placeholder='Введите имя пользователя'/>}
                <Card key={user.id} className={classNames(cls.FriendCard, {}, [className])} >
                <div  className={classNames(cls.Info, {}, [className])}>
                    <Avatar src={user?.avatar} alt={user?.lastname} size={100}/>
                    <div  className={classNames(cls.ContainerFio, {}, [className])}>
                        <Text title={`имя: ${ user?.lastname}`}/>
                        <Text title={user?.name}/>
                        <Text title={user?.login}/>
                    </div>
                    <div  className={classNames(cls.ContainerInfo, {}, [className])}>
                        <Text title={`город: ${  user?.city}`}/>
                        <Text title={`Страна: ${  user?.country}`}/>
                        <Text title={`Возраст: ${  user?.age}`}/>
                    </div>
                </div>
                    <div className={classNames(cls.ContainerInfo, {}, [className])}>
                        {isAddingNew && <Button
                            onClick={()=> {if (user.id) handleAddFriend(user.id)}}>
                            {t('Добавить в друзья')}
                        </Button>}
                        {!isAddingNew && <Button
                            onClick={()=> {if (user.id) {handleDeleteFriend(user.id)}}}
                            type="submit">
                            {t('Удалить из друзей')}
                        </Button>}
                        {accept && <Button
                            onClick={()=> {if (user.acceptId) {handleAccept(user.acceptId)}}}
                            type="submit">
                            {t('Принять заявку')}
                        </Button>}
                        <Button>{t('Написать сообщение')}</Button>
                    </div>
                </Card>
        </div>
    );
    }};

export default memo(FriendCard)
