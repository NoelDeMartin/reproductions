import { fetchLoginUserProfile } from '@noeldemartin/solid-utils'
import { login, getDefaultSession, handleIncomingRedirect, fetch } from '@inrupt/solid-client-authn-browser'

let profile;

async function main() {
    await handleIncomingRedirect();

    document.getElementById('login-form').onsubmit = e => {
        e.preventDefault();

        launchLogin(document.getElementById('login-form').querySelector('input').value);
    };
    document.getElementById('test-japanese').onclick = () => test('行くぞ');
    document.getElementById('test-english').onclick = () => test('Testing');

    if (getDefaultSession().info.isLoggedIn) {
        profile = await fetchLoginUserProfile(getDefaultSession().info.webId);

        document.getElementById('logged-in').removeAttribute('hidden');
    } else {
        document.getElementById('guest').removeAttribute('hidden');
    }

    document.getElementById('loading').setAttribute('hidden', '');
}

async function launchLogin(loginUrl) {
    const url = new URL(window.location.href);

    url.search = '';

    await login({
        oidcIssuer: loginUrl,
        redirectUrl: url.href,
    });
}

async function test(name) {
    const url = profile.storageUrls[0] + Date.now();

    await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/sparql-update',
            'If-None-Match': '*',
        },
        body: `INSERT DATA { <#it> <https://schema.org/name> "${name}" . }`,
    });

    await fetch(url);
}

main();
