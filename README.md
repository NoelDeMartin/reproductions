# Reproductions

This repository contains [minimal reproductions](https://stackoverflow.com/help/minimal-reproducible-example) to issues I've found. In particular, this branch reproduces a bug with [@intlify/unplugin-vue-i18n](https://github.com/intlify/bundle-tools) about using aliases for importing `.yaml`: [#611](https://github.com/intlify/bundle-tools/issues/611)

It can be reproduced with the following commands:

```sh
pnpm install
pnpm exec playwright install --with-deps
pnpm run build # <-- This shows some warnings, but doesn't fail
pnpm run test:e2e # <-- This showcases the issue, files weren't loaded properly
```

If you just want to clone this branch, use the following command:

```sh
git clone git@github.com:NoelDeMartin/reproductions.git intlify-i18n-aliases --branch intlify-i18n-aliases --single-branch
```
