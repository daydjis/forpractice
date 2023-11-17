import { useNavigate } from 'react-router-dom';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import vk from '@/shared/assets/icons/vk.jpg';
import rutube from '@/shared/assets/icons/rutube.jpg';
import telegramm from '@/shared/assets/icons/телеграф.png';
import cls from './Description.module.scss';
import text from './shared/const/text'

export const Description = () => {

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/', { replace: true });
    };

    const handleLinks = (src) => {
        window.open(src);
    };

    return (
        <>
            <Text />
            <Card
                children={
                <Text text={text} />
                }
            />
            <br />
            <Button size="m" onClick={handleRedirect}>
                На главную
            </Button>
            <hr className={cls.hrContent} />

            <div className={cls.Conteiner}>
                <Text bold text="Наши социальные сети" />
                <div className={cls.tableLinksButtons}>
                    <Button
                        imageBackground={vk}
                        isSmall
                        onClick={() => handleLinks('https://vk.com')}
                     />
                    <Button
                        imageBackground={rutube}
                        isSmall={false}
                        onClick={() => handleLinks('https://rutube.ru')}
                     />
                    <Button
                        imageBackground={telegramm}
                        isSmall
                        onClick={() => handleLinks('https://t.me/telegram')}
                     />
                </div>
            </div>
        </>
    );
};
