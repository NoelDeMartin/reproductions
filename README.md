# Reproductions

This repository contains [minimal reproductions](https://stackoverflow.com/help/minimal-reproducible-example) to issues I've found. In particular, this branch reproduces a bug with [Rolldown](https://rolldown.rs/) building CJS output: [#10011](https://github.com/rolldown/rolldown/issues/10011)

It can be reproduced with the following commands:

```sh
pnpm install
pnpm run build # <-- This generated the invalid build
pnpm run check # <-- This runs the failing node check
```

If you just want to clone this branch, use the following command:

```sh
git clone git@github.com:NoelDeMartin/reproductions.git rolldown-cjs --branch rolldown-cjs --single-branch
```
