import { bootstrap } from '@aerogel/core';
import i18n from '@aerogel/plugin-i18n';
import localFirst from '@aerogel/plugin-local-first';
import routing from '@aerogel/plugin-routing';
import solid from '@aerogel/plugin-solid';

import './assets/css/main.css';
import App from './App.vue';
import authConfig from './auth';
import routes from './pages/index';

export default await bootstrap(App, {
    plugins: [i18n(), routing({ routes }), solid(authConfig), localFirst()],
});
