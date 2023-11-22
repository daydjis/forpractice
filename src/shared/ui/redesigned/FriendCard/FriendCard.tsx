import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './FriendCard.module.scss';
import { Avatar } from '../Avatar';
import { Text } from '../Text';
import { Skeleton } from '../Skeleton';
import { Card } from '../Card';
import { Button } from '../Button';

export interface User {
    id?: number;
    login?: string;
    name?: string;
    lastname?: string;
    age?: number;
    avatar?: string;
    city?: string;
    country?: string;
    is_friend?: string;
    acceptId?: number;
    sentInvites?: boolean;
    recivieInvites?: boolean;
    myFriends?: boolean;
}
interface FriendCardProps {
    className?: string;
    isLoading?: boolean;
    user: User;
    handleDeleteFriend: (id: number) => void;
    handleAddFriend: (id: number) => void;
    handleAccept: (id: number) => void;
}

export const FriendCard = ({
    className,
    isLoading,
    user,
    handleAddFriend,
    handleDeleteFriend,
    handleAccept,
}: FriendCardProps) => {
    const isAllUsersList =
        !user.myFriends && !user.recivieInvites && !user.sentInvites;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <>
                <Skeleton border="50px" height={100} width={100} />
                <Skeleton height={50} width={1200} />
                <Skeleton height={50} width={1200} />
                <Skeleton border="50px" height={100} width={100} />
                <Skeleton height={50} width={1200} />
                <Skeleton height={50} width={1200} />
                <Skeleton border="50px" height={100} width={100} />
                <Skeleton height={50} width={1200} />
                <Skeleton height={50} width={1200} />
            </>
        );
    }

    const [disable, setDisable] = useState(false);
    const [disableDelete, setDisableDelete] = useState(false);
    const [disableAccept, setDisableAccept] = useState(false);
    return (
        <div style={{ marginTop: 20 }}>
            <Card
                key={user.id}
                style={{ padding: 30 }}
                className={classNames(cls.FriendCard, {}, [className])}
            >
                <div className={classNames(cls.Info, {}, [className])}>
                    <Avatar
                        src={user?.avatar}
                        alt={user?.lastname}
                        size={100}
                    />
                    <div
                        className={classNames(cls.ContainerFio, {}, [
                            className,
                        ])}
                    >
                        <Text title={`Фамилия: ${user?.lastname}`} />
                        <Text title={`Имя: ${user?.name}`} />
                        <Text title={`Логин: ${user?.name}`} />
                    </div>
                    <div
                        className={classNames(cls.ContainerInfo, {}, [
                            className,
                        ])}
                    >
                        <Text title={`Город: ${user?.city}`} />
                        <Text title={`Страна: ${user?.country}`} />
                        <Text title={`Возраст: ${user?.age}`} />
                    </div>
                </div>
                <div className={classNames(cls.ContainerInfo, {}, [className])}>
                    {isAllUsersList && (
                        <Button
                            disabled={disable}
                            onClick={() => {
                                if (user.id) handleAddFriend(user.id);
                                setDisable(true);
                            }}
                        >
                            {disable
                                ? t('Заявка уже отправлена')
                                : t('Добавить в друзья')}
                        </Button>
                    )}
                    {user.myFriends && (
                        <Button
                            disabled={disableDelete}
                            onClick={() => {
                                if (user.id) {
                                    handleDeleteFriend(user.id);
                                    setDisableDelete(true);
                                }
                            }}
                            type="submit"
                        >
                            {disableDelete
                                ? t('Удален')
                                : t('Удалить из друзей')}
                        </Button>
                    )}
                    {user.recivieInvites && (
                        <Button
                            disabled={disableAccept}
                            onClick={() => {
                                if (user.id) {
                                    handleAccept(user.id);
                                    setDisableAccept(true);
                                }
                            }}
                            type="submit"
                        >
                            {disableAccept ? t('Принята') : t('Принять заявку')}
                        </Button>
                    )}

                    <Button>{t('Написать сообщение')}</Button>
                </div>
            </Card>
        </div>
    );
};

export default memo(FriendCard);
