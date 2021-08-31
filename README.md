## Description

Desenvolvimento do desafio backend da Rocketseat.

 - As iterações com os desafios e submissões desenvolvidas no Postman, podem ser importadas por esse [Link](https://www.getpostman.com/collections/04f2804b4ddb2777baf2);
 - A imagem do postgres sugerida para o uso ("bitnami/postgresql") estava tendo problema com a criação de uuidv4, então foi trocado para a imagem do [Hub.docker](https://hub.docker.com/_/postgres) e funcionou perfeitamente.
 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migration

```bash
# generate migration
$ npm run migration:generate

# run migration
$ npm run migration:run

```
