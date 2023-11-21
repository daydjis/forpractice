import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/redesigned/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AccordionItem } from '@/shared/ui/redesigned/accordion/collapse';
import slc from './QaPageContent.module.scss';

interface faqList {
    QaQuestions: string;
    QaAnswers: string;
}

export const QaPageContent = () => {
    const faqList: faqList[] = [
        {
            QaQuestions: 'Не помню свой пароль, что делать?',
            QaAnswers: 'Создай новый аккаунт',
        },
        {
            QaQuestions: 'Сколько будет 2 в 10й степени?',
            QaAnswers: '1024',
        },
        {
            QaQuestions: 'Какого цвета солнце?',
            QaAnswers: 'Белого',
        },
        {
            QaQuestions: 'Как назвать сына?',
            QaAnswers: 'Евгений',
        },
    ];
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/', { replace: true });
    };

    return (
        <>
            <ul className={classNames(slc.accordion, {}, [])}>
                {faqList.map((item) => {
                    return (
                        <AccordionItem faqItem={item} key={item.QaAnswers} />
                    );
                })}
            </ul>
            <Button size="m" onClick={handleRedirect}>
                {t('На главную')}
            </Button>
        </>
    );
};
