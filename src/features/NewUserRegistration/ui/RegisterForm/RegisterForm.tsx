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

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(registerActions.setPassword(value));
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
                        className={classNames(cls.LoginForm, {}, [className])}
                    >
                        <Text title={t('Форма авторизации')} />
                        {error && (
                            <Text
                                text={t('Вы ввели неверный логин или пароль')}
                                variant="error"
                            />
                        )}
                        <Input
                            autofocus
                            type="text"
                            className={cls.input}
                            placeholder={t('Введите username')}
                            onChange={onChangeUsername}
                            value={username}
                        />
                        <Input
                            type="text"
                            className={cls.input}
                            placeholder={t('Введите пароль')}
                            onChange={onChangePassword}
                            value={username}
                        />
                        <Button
                            className={cls.loginBtn}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('Войти')}
                        </Button>
                    </VStack>
        </DynamicModuleLoader>
    );
});

export default RegistrationFrom;
