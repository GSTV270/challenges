# ZRP DEV Challenge - iHeros

## Contruído utilizando

### Backend
* [Node.JS](https://github.com/nodejs/node)
* [Typescript](https://github.com/microsoft/TypeScript)
* [Express](https://github.com/expressjs/express)
* [node-sqlite3](https://github.com/mapbox/node-sqlite3)
* [Jest](https://github.com/facebook/jest)
* [Socket.IO](https://github.com/socketio/socket.io)
* [TypeORM](https://github.com/typeorm/typeorm)

### Frontend
* [ReactJS](https://github.com/facebook/react)
* [Typescript](https://github.com/microsoft/TypeScript)
* [styled-components](https://github.com/styled-components/styled-components)
* [axios](https://github.com/axios/axios)
* [leaflet](https://github.com/Leaflet/Leaflet)

## Experiência

Durante o desenvolvimento do iHeros pude superar diversos desafio muito interessantes.
Levando em conta o desafio proposto e meus conhecimentos, optei por desenvolvevor a aplicação com frontend utilizando ReactJS que consome uma api desenvolvida com NodeJS e Express.js. A api foi desenvolvida aplicando DDD e TDD.
Para persistencia dos dados, optei por SQLite, que me parece a melhor opção nesse contexto de desafio, pois facilita a preparação do ambiente para testes. Em um caso real de uso, provavelmente teria utilizado PostgreSQL.

## Instruções

### Backend
Como optei por utilizar SQLite, já coloquei no repositório uma base criada (backend/src/database/database.sqlite), mas caso seja necessário criar uma nova, basta excluir esse arquivo e rodar o comando

```sh
npm run typeorm migration:run
```

e para executar a rotina de testes unitários, basta utilizar o comando

```sh
npm run test
```

No mais, basta executar na pasta backend os comandos

```sh
npm install
```
e

```sh
npm run dev:server
```


### Frontend
Basta executar na pasta frontend os comandos

```sh
npm install
```
e

```sh
npm run start
```



