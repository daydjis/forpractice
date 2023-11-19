import React, { useState, useEffect } from 'react';
import slc from './accordion.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export const AccordionItem = ({ faqItem }) => {
    const [hide, setHide] = useState(false);
    const clickHandler = () => {
        setHide((e) => !e);
    };
    useEffect(() => {
        console.log(faqItem);
    });
    return (
        <li className={classNames(slc.accordionItem, {}, [])}>
            <button
                className={classNames(slc.accordionHeader, {}, [])}
                onClick={() => clickHandler()}
            >
                {faqItem.q}
            </button>
            <div className={classNames(hide ? slc.open : slc.close, {}, [])}>
                <div className={classNames(slc.accordionBody, {}, [])}>
                    {faqItem.a}
                </div>
            </div>
        </li>
    );
};
