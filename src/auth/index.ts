import type { Options } from '@aerogel/plugin-solid';

import UvdslAuthenticator from './UvdslAuthenticator';

export type AppAuthenticators = typeof authenticators;

export const authenticators = {
    uvdsl: new UvdslAuthenticator(),
};

export const authConfig: Options = { defaultAuthenticator: 'uvdsl', authenticators };

export default authConfig;

declare module '@aerogel/plugin-solid' {
    interface Authenticators extends AppAuthenticators {}
}
