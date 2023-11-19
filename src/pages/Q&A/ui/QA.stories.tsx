import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import QA from './QA';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'pages/QA',
    component: QA,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof QA>;

const Template: ComponentStory<typeof QA> = () => <QA />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
