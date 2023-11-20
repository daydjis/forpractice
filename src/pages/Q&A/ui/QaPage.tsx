import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { QaPageContent } from '@/entities/QA';

const QaPage = () => {
    const { t } = useTranslation('Q&A');

    return (
        <Page data-testid="QaPage">
            {t('Q&A')}
            <QaPageContent />
        </Page>
    );
};

export default QaPage;
