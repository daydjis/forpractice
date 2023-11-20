import React, { useState, useEffect } from 'react';
import slc from './accordion.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export const AccordionItem = ({ faqItem }) => {
    const [hide, setHide] = useState(false);
    const clickHandler = () => {
        setHide((prevState) => !prevState);
    };
    return (
        <li className={classNames(slc.accordionItem, {}, [])}>
            <button
                className={classNames(slc.accordionHeader, {}, [])}
                onClick={() => clickHandler()}
            >
                {faqItem.QaQuestions}
            </button>
            <div className={classNames(hide ? slc.open : slc.close, {}, [])}>
                <div className={classNames(slc.accordionBody, {}, [])}>
                    {faqItem.QaAnswers}
                </div>
            </div>
        </li>
    );
};
