import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        // baseUrl: 'http://localhost:3000/',
        baseUrl: 'https://backend-mu-dun.vercel.app/'
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
        },
    },
});
