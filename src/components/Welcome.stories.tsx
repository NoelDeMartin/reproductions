import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Welcome from './Welcome.vue';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof Welcome> = {
    title: 'Welcome',
    component: Welcome,
};

export const Primary: Story = {};

export default meta;
