import React, {memo, useEffect} from 'react';
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
    list?: Array<User>;
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
        list,
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

    return (
        <div style={{marginTop: 20}} >
            {isAddingNew && <Input onChange={()=>{}} placeholder='Введите имя пользователя'/>}
            {list?.map(item => (
                <Card key={item.id} className={classNames(cls.FriendCard, {}, [className])} >
                <div  className={classNames(cls.Info, {}, [className])}>
                    <Avatar src={item?.avatar} alt={item?.lastname} size={100}/>
                    <div  className={classNames(cls.ContainerFio, {}, [className])}>
                        <Text title={`имя: ${ item?.lastname}`}/>
                        <Text title={item?.name}/>
                        <Text title={item?.login}/>
                    </div>
                    <div  className={classNames(cls.ContainerInfo, {}, [className])}>
                        <Text title={`город: ${  item?.city}`}/>
                        <Text title={`Страна: ${  item?.country}`}/>
                        <Text title={`Возраст: ${  item?.age}`}/>
                    </div>
                </div>
                    <div className={classNames(cls.ContainerInfo, {}, [className])}>
                        {isAddingNew && <Button
                            onClick={()=> {if (item.id) handleAddFriend(item.id)}}>
                            {t('Добавить в друзья')}
                        </Button>}
                        {!isAddingNew && <Button
                            onClick={()=> {if (item.id) {handleDeleteFriend(item.id)}}}
                            type="submit">
                            {t('Удалить из друзей')}
                        </Button>}
                        {accept && <Button
                            onClick={()=> {if (item.acceptId) {handleAccept(item.acceptId)}}}
                            type="submit">
                            {t('Принять заявку')}
                        </Button>}
                        <Button>{t('Написать сообщение')}</Button>
                    </div>
                </Card>
            ))
        }</div>
    );
};

export default memo(FriendCard)
