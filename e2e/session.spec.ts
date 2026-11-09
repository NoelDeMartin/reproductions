import { input, press, see, serverUrl, solidLogin, solidReset, webId } from '@aerogel/playwright';
import { expect, test } from '@playwright/test';

test('Restores the session after reloading', async ({ page }) => {
    await solidReset();
    await page.goto('/');
    await press(page, 'Configuration');
    await press(page, 'Connect account');
    await input(page, 'Login url').fill(serverUrl());
    await press(page, 'Log in');
    await solidLogin(page);
    await press(page, 'Open account');
    await see(page, 'Everything is up to date');
    await see(page, webId());

    await page.reload();
    await press(page, 'Open account');
    await see(page, 'Everything is up to date');
    await see(page, webId());
});

test('Reads CryptoKey from IndexedDB in a SharedWorker', async ({ page }) => {
    await page.goto('/');

    const result = await page.evaluate(async () => {
        const keyPair = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
        const db = await new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open('sharedworker-cryptokey', 1);
            request.onupgradeneeded = () => request.result.createObjectStore('keys');
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });

        await new Promise((resolve) => {
            const transaction = db.transaction('keys', 'readwrite');
            transaction.objectStore('keys').put(keyPair, 'key');
            transaction.oncomplete = resolve;
        });
        db.close();

        const source = `
            self.onconnect = ({ ports: [port] }) => {
                const request = indexedDB.open('sharedworker-cryptokey', 1);
                request.onsuccess = () => {
                    const get = request.result.transaction('keys').objectStore('keys').get('key');
                    get.onsuccess = () => {
                        try {
                            port.postMessage(get.result.privateKey instanceof CryptoKey ? 'CryptoKey' : String(get.result));
                        } catch (error) {
                            port.postMessage(error.name + ': ' + error.message);
                        }
                    };
                };
            };
        `;
        const worker = new SharedWorker(URL.createObjectURL(new Blob([source], { type: 'text/javascript' })));

        return new Promise((resolve) => {
            worker.port.onmessage = (event) => resolve(event.data);
            setTimeout(() => resolve('No reply from the SharedWorker'), 5000);
        });
    });

    expect(result).toBe('CryptoKey');
});
