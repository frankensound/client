import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createAuth0 } from '@auth0/auth0-vue'

const app = createApp(App)

async function init() {
    try {
        const configResponse = await fetch('/config/config.json');
        const config = await configResponse.json();

        const app = createApp(App);

        app.config.globalProperties.$config = config;

        const auth = createAuth0({
            domain: config.VITE_AUTH0_DOMAIN,
            clientId: config.VITE_AUTH0_CLIENT_ID,
            authorizationParams: {
                redirect_uri: window.location.origin,
                audience: config.VITE_AUTH0_AUDIENCE,
            }
        });

        app.use(auth)

        app.mount('#app');
    } catch (error) {
        console.error('Failed to load configuration:', error);
    }
}

init();
