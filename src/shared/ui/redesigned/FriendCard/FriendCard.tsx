import React, {memo} from 'react';
import { useTranslation } from 'react-i18next';
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./FriendCard.module.scss"
import { Avatar } from '../Avatar';
import {Text} from '../Text'
import { Skeleton } from '../Skeleton';
import { Card } from '../Card';
import { Button } from '../Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export interface User {
    id?: number,
    login?: string,
    name?: string,
    lastname?: string,
    age?: number,
    avatar?: string,
    city?: string,
    country?: string,
    is_friend?: string,
    acceptId?: number,
}
interface FriendCardProps {
    accept?: boolean;
    className?: string;
    isLoading?: boolean;
    user: User;
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
}: FriendCardProps
) => {
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
    return (
        <div style={{marginTop: 20}} >
                <Card key={user.id} style={{padding: 30}} className={classNames(cls.FriendCard, {}, [className])} >
                <div  className={classNames(cls.Info, {}, [className])}>
                    <Avatar src={user?.avatar} alt={user?.lastname} size={100}/>
                    <div  className={classNames(cls.ContainerFio, {}, [className])}>
                        <Text title={`Фамилия: ${ user?.lastname}`}/>
                        <Text title={`Имя: ${user?.name}`}/>
                        <Text title={`Логин: ${user?.name}`}/>
                    </div>
                    <div  className={classNames(cls.ContainerInfo, {}, [className])}>
                        <Text title={`Город: ${  user?.city}`}/>
                        <Text title={`Страна: ${  user?.country}`}/>
                        <Text title={`Возраст: ${  user?.age}`}/>
                    </div>
                </div>
                    <div className={classNames(cls.ContainerInfo, {}, [className])}>
                        {isAddingNew  && <Button
                            onClick={()=> {if (user.id) handleAddFriend(user.id)}}>
                            {t('Добавить в друзья')}
                        </Button>}
                        {!isAddingNew && !accept  && <Button
                            onClick={()=> {if (user.id) {handleDeleteFriend(user.id)}}}
                            type="submit">
                            {t('Удалить из друзей')}
                        </Button>}
                        {accept && <Button
                            onClick={()=> {if (user.id) {handleAccept(user.id)}}}
                            type="submit">
                            {t('Принять заявку')}
                        </Button>}
                        {false &&
                            <Button disabled>{t('Заявка уже отправлена')}</Button>
                        }
                        <Button>{t('Написать сообщение')}</Button>
                    </div>
                </Card>
        </div>
    );
};

export default memo(FriendCard)
