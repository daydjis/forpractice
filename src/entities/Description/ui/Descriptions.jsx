import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { useNavigate } from 'react-router-dom';
import vk from '@/shared/assets/icons/vk.jpg';
import rutube from '@/shared/assets/icons/rutube.jpg';
import telegramm from '@/shared/assets/icons/телеграф.png';
import cls from './Description.module.scss';

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
                    <Text
                        text="Добро пожаловать на ДревниеРусы.ру! Мы рады приветствовать вас в этом динамичном мире информационных технологий, бизнеса и интернета. Наш сайт является площадкой для обмена новостями, аналитическими статьями и мыслями, связанными с данными темами.

                    ДревниеРусы - это система тематических коллективных блогов, где каждый может опубликовать свою статью или новость. Мы предоставляем возможность поделиться своими идеями, опытом и знаниями с другими участниками сообщества.
                    
                    На нашем сайте вы найдете актуальные новости из мира ИТ, бизнеса и интернета, обзоры новых технологий и продуктов, а также аналитические статьи о влиянии информационных технологий на экономику и общество.
                    
                    Мы следим за всеми новинками и трендами в области информационных технологий и всегда готовы предоставить вам самую свежую информацию. Наши эксперты анализируют актуальные события и явления, чтобы помочь вам быть в курсе последних тенденций и принять правильные решения для своего бизнеса."
                    ></Text>
                }
            />
            <br />
            <Button size="m" onClick={handleRedirect}>
                {'На главную'}
            </Button>
            <hr className={cls.hrContent} />

            <div className={cls.Conteiner}>
                <Text bold text="Наши социальные сети"></Text>
                <div className={cls.tableLinksButtons}>
                    <Button
                        imageBackground={vk}
                        isSmall={true}
                        onClick={() => handleLinks('https://vk.com')}
                    ></Button>
                    <Button
                        imageBackground={rutube}
                        isSmall={false}
                        onClick={() => handleLinks('https://rutube.ru')}
                    ></Button>
                    <Button
                        imageBackground={telegramm}
                        isSmall={true}
                        onClick={() => handleLinks('https://t.me/telegram')}
                    ></Button>
                </div>
            </div>
        </>
    );
};
