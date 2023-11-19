import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/redesigned/Text';
import { Accordion } from '@/shared/ui/redesigned/accordion';
import { Button } from '@/shared/ui/redesigned/Button';
import { useNavigate } from 'react-router-dom';

const faqList = [
    {
        q: 'Не помню свой пароль, что делать?',
        a: 'Создай новый аккаунт',
    },
    {
        q: 'Сколько будет 2 в 10й степени?',
        a: '1024',
    },
    {
        q: 'Какого цвета солнце?',
        a: 'Белого',
    },
    {
        q: 'Как назвать сына?',
        a: 'Евгений',
    },
];
export const Qa = () => {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/', { replace: true });
    };
    const { t } = useTranslation();
    return (
        <>
            <Text />
            <Accordion faqList={faqList} />
            <Button
                size="m"
                onClick={handleRedirect}
                children={<Text text="На главную" />}
            ></Button>
        </>
    );
};
