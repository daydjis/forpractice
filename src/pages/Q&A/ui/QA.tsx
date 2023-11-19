import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Qa } from '@/entities/QA';

const QA = () => {
    const { t } = useTranslation('Q&A');

    return (
        <Page data-testid="QA">
            {t('Q&A')}
            <Qa />
        </Page>
    );
};

export default QA;
