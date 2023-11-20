import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { useNavigate } from 'react-router-dom';
import { classNames } from "@/shared/lib/classNames/classNames";
import { AccordionItem } from '@/shared/ui/redesigned/accordion/collapse';
import slc from './QaPageContent.module.scss'

const faqList = [
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
export const QaPageContent = () => {
    const Accordion = ({ faqList }) => {
        return (
            <ul className={classNames(slc.accordion, {}, [])}>
                {faqList.map((item) => {
                    return <AccordionItem faqItem={item} />;
                })}
            </ul>
        );
    };
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
