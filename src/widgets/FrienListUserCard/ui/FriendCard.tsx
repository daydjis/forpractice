import React from 'react';
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./FriendCard.module.scss"
import {Friends} from "@/entities/Friends";
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import {Text} from '@/shared/ui/redesigned/Text/Text'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

interface FriendCardProps {
    className?: string;
    isLoading?: boolean;
    list?: Array<Friends>;
    isAddingNew: boolean
}

export const FriendCard = ({className, isLoading, list, isAddingNew}: FriendCardProps) => {
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
        <div style={{marginTop: 20}} >
            {/* eslint-disable-next-line i18next/no-literal-string */}
            {isAddingNew && <Input onChange={()=>{}} placeholder='Введите имя пользователя'/>}
            {list?.map(item => (
                <Card key={item.user.id} className={classNames(cls.FriendCard, {}, [className])} >
                <div  className={classNames(cls.Info, {}, [className])}>
                    <Avatar src={item?.user.avatar} alt={item?.user.lastname} size={100}/>
                    <div  className={classNames(cls.ContainerFio, {}, [className])}>
                        <Text title={`имя: ${ item?.user.lastname}`}/>
                        <Text title={item?.user.name}/>
                        <Text title={item?.user.login}/>
                    </div>
                    <div  className={classNames(cls.ContainerInfo, {}, [className])}>
                        <Text title={`город: ${  item?.user.city}`}/>
                        <Text title={`Страна: ${  item?.user.country}`}/>
                        <Text title={`Возраст: ${  item?.user?.age}`}/>
                    </div>
                </div>
                    <div className={classNames(cls.ContainerInfo, {}, [className])}>
                        {isAddingNew && <Button>Добавить в друзья</Button>}
                        {item.info && <Button type="reset" >Удалить из друзей</Button>}
                        <Button>Написать сообщение</Button>
                    </div>
                </Card>
            ))
        }</div>
    );
};

export default FriendCard