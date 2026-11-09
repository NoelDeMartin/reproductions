import { Errors } from '@aerogel/core';
import { AuthenticationFailedError, Authenticator, Solid } from '@aerogel/plugin-solid';
import type { AuthSession } from '@aerogel/plugin-solid';
import { after, fail, required } from '@noeldemartin/utils';
import { Session } from '@uvdsl/solid-oidc-client-browser';
import workerUrl from '@uvdsl/solid-oidc-client-browser/RefreshWorker?url';
import AerogelSolid from 'virtual:aerogel-solid';

export default class UvdslAuthenticator extends Authenticator {
    private session?: Session;

    public async login(loginUrl: string): Promise<AuthSession> {
        const redirectUrl = AerogelSolid.clientID?.redirect_uris[0] ?? globalThis.location.href;

        await this.requireSession().login(loginUrl, redirectUrl);

        // Browser should redirect, so just make it wait for a while.
        await after({ seconds: 60 });

        return fail("Browser should have redirected, but it didn't");
    }

    public async logout(): Promise<void> {
        await this.requireSession().logout();
        await this.endSession();
    }

    protected async restoreSession(): Promise<void> {
        const session = (this.session = new Session(
            AerogelSolid.clientID && { client_id: AerogelSolid.clientID.client_id },
            { workerUrl },
        ));

        if (!Solid.wasLoggedIn()) {
            return;
        }

        try {
            await session.handleRedirectFromLogin();
        } catch (error) {
            await this.failSession(
                required(Solid.previousSession).loginUrl,
                new AuthenticationFailedError('Could not complete authentication', null, { cause: error }),
            );

            return;
        }

        if (!session.isActive) {
            await session.restore().catch((error) => Errors.report(error));
        }

        if (!session.webId) {
            return;
        }

        await this.initAuthenticatedFetch((input: RequestInfo, init?: RequestInit) => session.authFetch(input, init));

        try {
            const user = await Solid.requireUserProfile(session.webId, { fetch: this.requireAuthenticatedFetch() });

            await this.startSession({ user, loginUrl: session.webId });
        } catch (error) {
            await this.failSession(session.webId, error);
        }
    }

    private requireSession(): Session {
        return this.session ?? fail('Authenticator has not been booted');
    }
}
