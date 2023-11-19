import React, { useEffect, useState } from 'react';
import slc from './accordion.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AccordionItem } from './collapse';

export const Accordion = ({ faqList }) => {
    useEffect(() => {
        console.log(faqList);
    });
    return (
        <ul className={classNames(slc.accordion, {}, [])}>
            {faqList.map((item) => {
                return <AccordionItem faqItem={item} />;
            })}
        </ul>
    );
};
