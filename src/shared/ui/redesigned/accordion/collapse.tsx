import React, { useState } from 'react';
import slc from './accordion.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';


interface AccordionItemProps {
    faqItem: any
}
export const AccordionItem = (props: AccordionItemProps) => {

    const { faqItem } = props

    const [hide, setHide] = useState(false);
    const clickHandler = () => {
        setHide((prevState) => !prevState);
    };
    return (
        <li className={classNames(slc.accordionItem, {}, [])} key={faqItem.QaQuestions}>
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
