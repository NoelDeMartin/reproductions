# Reproductions

This repository contains [minimal reproductions](https://stackoverflow.com/help/minimal-reproducible-example) to issues I've found. In particular, this branch reproduces a bug with [@uvdsl/solid-oidc-client-browser](https://github.com/uvdsl/solid-oidc-client-browser) in Webkit: [#37](https://github.com/uvdsl/solid-oidc-client-browser/issues/37)

The issue can be seen reproduced in the Github Actions from this repository: chrome and firefox tests pass, but webkit fails.

If you just want to clone this branch, use the following command:

```sh
git clone git@github.com:NoelDeMartin/reproductions.git uvdsl-webkit --branch uvdsl-webkit --single-branch
```
