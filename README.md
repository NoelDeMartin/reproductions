# Reproductions

This repository contains [minimal reproductions](https://stackoverflow.com/help/minimal-reproducible-example) to issues I've found. In particular, this branch reproduces a bug with the [CommunitySolidServer](https://github.com/CommunitySolidServer/CommunitySolidServer) where using Japanese characters causes a 401 response.

It can be reproduced with the following commands:

```sh
npm install
npm run cy:dev
```

If you just want to clone this branch, use the following command:

```sh
git clone git@github.com:NoelDeMartin/reproductions.git css-encoding-401 --branch css-encoding-401 --single-branch
```
