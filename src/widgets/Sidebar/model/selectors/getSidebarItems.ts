import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';
import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';

import MainIcon from '@/shared/assets/icons/home.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import FriendsIcon from '@/shared/assets/icons/friends.svg';
import QAIcon from '@/shared/assets/icons/magnifying.svg';

import { SidebarItemType } from '../types/sidebar';
import {
    getRouteAbout,
    getRouteArticles,
    getRouteFriends,
    getRouteMain,
    getRouteProfile,
    getRouteQa,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

export const useSidebarItems = () => {
    const userData = useSelector(getUserAuthData);
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => MainIconDeprecated,
                on: () => MainIcon,
            }),
            text: 'Главная',
        },
        {
            path: getRouteAbout(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => AboutIconDeprecated,
                on: () => AboutIcon,
            }),
            text: 'О сайте',
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData.id),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ProfileIconDeprecated,
                    on: () => ProfileIcon,
                }),
                text: 'Профиль',
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ArticleIconDeprecated,
                    on: () => ArticleIcon,
                }),
                text: 'Статьи',
                authOnly: true,
            },
            {
                path: getRouteFriends(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => FriendsIcon,
                    on: () => FriendsIcon,
                }),
                text: 'Мои друзья',
                authOnly: true,
            },
            {
                path: getRouteQa(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => QAIcon,
                    on: () => QAIcon,
                }),
                text: 'Q&A',
                authOnly: true,
            },
        );
    }

    return sidebarItemsList;
};
