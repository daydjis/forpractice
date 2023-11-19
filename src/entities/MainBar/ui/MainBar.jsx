import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/redesigned/Text';
import { Link } from 'react-router-dom';
import cls from './MainBar.module.scss';

export const MainBar = () => {
    const { t } = useTranslation();
    return (
        <div className={cls.wrapper}>
            <Text />
            <div className={cls.firstBarDiv}>
                <Link to="habr" className={cls.firstBarLinks}>
                    <Text className={cls.textInLinks} text="Хабр" />
                </Link>
                <Link to="QA" className={cls.firstBarLinks}>
                    <Text className={cls.textInLinks} text="Q&A" />
                </Link>
                <Link to="career" className={cls.firstBarLinks}>
                    <Text className={cls.textInLinks} text="Карьера" />
                </Link>
                <Link to="freelance" className={cls.firstBarLinks}>
                    <Text className={cls.textInLinks} text="Фриланс" />
                </Link>
            </div>
            <div className={cls.test}>
                <div className={cls.container}>
                    <main>
                        <header>
                            <h2 className={cls.subheader}>— Keyframers</h2>
                            <h1>
                                Where we bring imaginative user interfaces{' '}
                                <em>to life.</em>
                            </h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Rerum suscipit ipsam
                                aspernatur quasi reiciendis at eum cupiditate
                                officiis repudiandae quae ea facere odit beatae
                                voluptate recusandae quas, possimus laborum
                                inventore.
                            </p>
                        </header>

                        <img
                            src="https://images.unsplash.com/photo-1558459654-c430be5b0a44?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixid=MXwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHw&ixlib=rb-1.2.1&q=80&w=960&h=500"
                            alt=""
                        />

                        <section>
                            <h2>The Client</h2>
                            <p>
                                You! Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Totam voluptatum quidem
                                eligendi debitis quia dignissimos ipsa error,
                                atque quibusdam corrupti soluta facere nulla
                                neque nostrum recusandae assumenda, aspernatur
                                in. Provident!
                            </p>
                        </section>

                        <section>
                            <h2>Our Mission</h2>
                            <p>
                                To educate the world in web animation. Lorem
                                ipsum dolor sit amet consectetur adipisicing
                                elit. Blanditiis ipsa doloremque, natus dolorum
                                a perferendis modi veritatis ab earum, culpa
                                nemo, aliquam qui! Nostrum iste ullam
                                voluptatem, doloribus odit autem.
                            </p>
                        </section>
                        <div className={cls.callout}>
                            <h3>Get animating!</h3>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Consequatur magni dolores
                                iusto nulla vitae, reiciendis amet veritatis
                                aliquam iste temporibus itaque aliquid, eveniet
                                saepe reprehenderit distinctio eaque libero,
                                culpa tenetur.
                            </p>
                        </div>

                        <img
                            src="https://images.unsplash.com/photo-1603791445824-0050bd436b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHw&ixlib=rb-1.2.1&q=80&w=960"
                            alt=""
                        />
                    </main>
                </div>

                <a
                    href="https://youtu.be/cxwZfcoiUSE"
                    target="_blank"
                    data-keyframers-credit
                    style={{ color: '#ffffff', zIndex: 10 }}
                ></a>
                <script src="https://codepen.io/shshaw/pen/QmZYMG.js"></script>
            </div>
        </div>
    );
};
