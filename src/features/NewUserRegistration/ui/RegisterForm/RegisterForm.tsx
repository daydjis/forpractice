import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { registrationNewUser} from '../../model/services/loginByUsername/registrationNewUser';
import { registerActions, registerReducer } from '../../model/slice/RegisterSlice';
import cls from './RegisterFrom.module.scss';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { getUserRegister} from '../../model/selectors/getUserInfo/getUserInfo';
import {getRegisterError} from '../../model/selectors/getRegisterError/getLoginError';
import {getRegisterIsLoading} from '../../model/selectors/getRegisterLoading/getLoginIsLoading';
import {CountrySelect} from "@/entities/Country";

export interface RegisterFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    register: registerReducer,
};

const RegistrationFrom = memo(({ className, onSuccess }: RegisterFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useSelector(getUserRegister);
    const isLoading = useSelector(getRegisterIsLoading);
    const error = useSelector(getRegisterError);
    const forceUpdate = useForceUpdate();
    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(registerActions.setLogin(value));
        },
        [dispatch],
    );

    const onChangeLastname = useCallback(
        (value: string) => {
            dispatch(registerActions.setLastname(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(registerActions.setPassword(value));
        },
        [dispatch],
    );

    const onChangeAvatar = useCallback(
        (value: string) => {
            dispatch(registerActions.setAvatar(value));
        },
        [dispatch],
    );

    const onChangeCity = useCallback(
        (value: string) => {
            dispatch(registerActions.setCity(value));
        },
        [dispatch],
    );

    const onChangeCountry = useCallback(
        (value: string) => {
            dispatch(registerActions.setCountry(value));
        },
        [dispatch],
    );

    const onChangeAge = useCallback(
        (value: string) => {
            dispatch(registerActions.setAge(Number(value)));
        },
        [dispatch],
    );

    const onChangeName = useCallback(
        (value: string) => {
            dispatch(registerActions.setName(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(registrationNewUser(username));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            forceUpdate();
        }
    }, [dispatch, username, onSuccess, forceUpdate]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
                    <VStack
                        gap="16"
                        className={classNames(cls.RegisterFrom, {}, [className])}
                    >
                        <Text title={t('Регистрация')} />
                        {error && (
                            <Text
                                text={error}
                                variant="error"
                            />
                        )}
                        <Input
                            autofocus
                            type="text"
                            className={cls.input}
                            placeholder={t('Введите name')}
                            onChange={onChangeName}
                            value={username.name}
                        />
                        <Input
                            autofocus
                            type="text"
                            className={cls.input}
                            placeholder={t('Введите login')}
                            onChange={onChangeUsername}
                            value={username.login}
                        />
                        <Input
                            autofocus
                            type="text"
                            className={cls.input}
                            placeholder={t('Введите lastname')}
                            onChange={onChangeLastname}
                            value={username.lastname}
                        />
                        <Input
                            type="password"
                            className={cls.input}
                            placeholder={t('Введите password')}
                            onChange={onChangePassword}
                            value={username.password}
                        />
                        <Input
                            type="text"
                            className={cls.input}
                            placeholder={t('Введите ссылку на avatar')}
                            onChange={onChangeAvatar}
                            value={username.avatar}
                        />
                        <Input
                            type="text"
                            className={cls.input}
                            placeholder={t('Введите city')}
                            onChange={onChangeCity}
                            value={username.city}
                        />
                        <Input
                            type="number"
                            className={cls.input}
                            placeholder={t('Введите age')}
                            onChange={onChangeAge}
                            value={username.age}
                        />
                        <CountrySelect onChange={onChangeCountry} value={username?.country}/>
                        <Button
                            className={cls.loginBtn}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('Зарегистрироваться')}
                        </Button>
                    </VStack>
        </DynamicModuleLoader>
    );
});

export default RegistrationFrom;
