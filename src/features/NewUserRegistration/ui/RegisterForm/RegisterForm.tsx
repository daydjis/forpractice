import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { registrationNewUser } from '../../model/services/loginByUsername/registrationNewUser';
import {
    registerActions,
    registerReducer,
} from '../../model/slice/RegisterSlice';
import cls from './RegisterFrom.module.scss';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { getUserRegister } from '../../model/selectors/getUserInfo/getUserInfo';
import { getRegisterError } from '../../model/selectors/getRegisterError/getLoginError';
import { getRegisterIsLoading } from '../../model/selectors/getRegisterLoading/getLoginIsLoading';
import { Country, CountrySelect } from '@/entities/Country';

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
    const user = useSelector(getUserRegister);
    const isLoading = useSelector(getRegisterIsLoading);
    const error = useSelector(getRegisterError);
    const forceUpdate = useForceUpdate();
    const [disable, setDisable] = useState(true);
    const isError = useMemo(
        () => ({
            name: true,
            login: true,
            lastname: true,
            password: true,
            city: true,
        }),
        [],
    );

    const ref = useRef(isError);

    useEffect(() => {
        if (Object.values(ref.current).find((error) => error === true)) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, []);

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(registerActions.setLogin(value));

            ref.current.login = value.length < 7;
        },
        [dispatch],
    );

    const onChangeLastname = useCallback(
        (value: string) => {
            dispatch(registerActions.setLastname(value));

            ref.current.lastname = value.length < 7;
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(registerActions.setPassword(value));
            ref.current.password = value.length < 7;
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
            ref.current.city = value.length < 3;
        },
        [dispatch],
    );

    const onChangeCountry = useCallback(
        (value: Country) => {
            dispatch(registerActions.setCountry(value));
        },
        [dispatch],
    );

    const onChangeAge = useCallback(
        (value: string) => {
            if (Number(value) > 0 && Number(value) < 100) {
                dispatch(registerActions.setAge(Number(value)));
            }
        },
        [dispatch],
    );

    const onChangeName = useCallback(
        (value: string) => {
            dispatch(registerActions.setName(value));
            if (value.length < 7) {
                isError.name = true;
            } else {
                isError.name = false;
            }
        },
        [isError, dispatch],
    );

    const onLoginClick = useCallback(async () => {
        // @ts-ignore
        const result = await dispatch(registrationNewUser(user));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            forceUpdate();
        }
    }, [dispatch, user, onSuccess, forceUpdate]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <VStack
                gap="16"
                className={classNames(cls.RegisterFrom, {}, [className])}
            >
                <Text title={t('Регистрация')} />
                {error && <Text text={error?.data} variant="error" />}
                <Input
                    autofocus
                    type="text"
                    className={cls.input}
                    placeholder={t('Введите name')}
                    onChange={onChangeName}
                    value={user.name}
                />
                {ref.current.name && (
                    <Text
                        text="Имя должно быть более 7 символов"
                        variant="error"
                    />
                )}
                <Input
                    autofocus
                    type="text"
                    className={cls.input}
                    placeholder={t('Введите login')}
                    onChange={onChangeUsername}
                    value={user.login}
                />
                {ref.current.login && (
                    <Text
                        text="Логин должен быть более 7 символов"
                        variant="error"
                    />
                )}
                <Input
                    autofocus
                    type="text"
                    className={cls.input}
                    placeholder={t('Введите lastname')}
                    onChange={onChangeLastname}
                    value={user.lastname}
                />
                {ref.current.lastname && (
                    <Text
                        text="Фамилия должна быть более 7 символов"
                        variant="error"
                    />
                )}
                <Input
                    type="password"
                    className={cls.input}
                    placeholder={t('Введите password')}
                    onChange={onChangePassword}
                    value={user.password}
                />
                {ref.current.password && (
                    <Text
                        text="Пароль должен быть более 7 символов"
                        variant="error"
                    />
                )}
                <Input
                    type="text"
                    className={cls.input}
                    placeholder={t('Введите ссылку на avatar')}
                    onChange={onChangeAvatar}
                    value={user.avatar}
                />
                <Input
                    type="text"
                    className={cls.input}
                    placeholder={t('Введите city')}
                    onChange={onChangeCity}
                    value={user.city}
                />
                {ref.current.city && (
                    <Text
                        text="Поле должно содержать минимум 3 символа"
                        variant="error"
                    />
                )}
                <Input
                    type="number"
                    className={cls.input}
                    placeholder={t('Введите age')}
                    onChange={onChangeAge}
                    value={user.age}
                />
                <CountrySelect
                    onChange={onChangeCountry}
                    value={user?.country}
                />
                <Button
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading || disable}
                >
                    {t('Зарегистрироваться')}
                </Button>
            </VStack>
        </DynamicModuleLoader>
    );
});

export default RegistrationFrom;
