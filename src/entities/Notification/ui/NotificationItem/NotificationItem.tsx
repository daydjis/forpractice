import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './NotificationItem.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import {User} from "@/entities/User";

interface NotificationItemProps {
    className?: string;
    user?: User | undefined
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, user } = props;

    const content = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    className={classNames(cls.NotificationItem, {}, [
                        className,
                    ])}
                >
                    <Text title={"У Вас заявока в друзья от:" + user?.name} />
                </Card>
            }
            off={
                <CardDeprecated
                    theme={CardTheme.OUTLINED}
                    className={classNames(cls.NotificationItem, {}, [
                        className,
                    ])}
                >
                </CardDeprecated>
            }
        />
    );

    if (user?.name) {
        return (
            <a
                className={cls.link}
                target="_blank"
                href={user?.name}
                rel="noreferrer"
            >
                {content}
            </a>
        );
    }

    return content;
});
