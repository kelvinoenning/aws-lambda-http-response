# aws-lambda-http-response

Este projeto foi criado para facilitar a montagem do objeto de retorno do Api Gateway dentro do Amazon Lambda, junto ao disparo da resposta automaticamente.

[![Build Status](https://travis-ci.org/kelvinoenning/aws-lambda-http-response.svg?branch=master)](https://travis-ci.org/kelvinoenning/aws-lambda-http-response)
[![Coverage Status](https://coveralls.io/repos/github/kelvinoenning/aws-lambda-http-response/badge.svg?branch=master)](https://coveralls.io/github/kelvinoenning/aws-lambda-http-response?branch=master)

## Como usar

### Instalação

Npm `$ npm i aws-lambda-http-response --save`

### Exemplos

#### Importar

```js
// import
const AwsLambdaHttpResponse = require("aws-lambda-http-response");

module.exports.handler = (event, context, callback) => {
  let res = new AwsLambdaHttpResponse({ callback });
  res.success();
};
```

### Funções de retorno

| Funções                      | status |
| ---------------------------- | ------ |
| `res.success()`              | 200    |
| `res.custom({status: xxx })` | xxx    |
| `res.error()`                | 500    |

Todos os métodos aceitam a adição de **_headers_** e/ou **_body_** seguindo o padrão abaixo:

```js
// Somente headers
res.success({ headers: { ... }});

// Somente body (formato json)
res.success({ body: { ... } });

// Somente body (formato string)
res.success({ body: '...' });

// Headers e (formato json)
res.success({ headers: { ... }, body: { ... } });

// Headers e (formato string)
res.success({ headers: { ... }, body: '...' });
```

#### Status 200.

```js
module.exports.handler = (event, context, callback) => {
  new AwsLambdaHttpResponse({ callback }).success();
};
/*
callback(null, { 
    statusCode: 200
});
*/
```

#### Status 500.

```js
module.exports.handler = (event, context, callback) => {
  new AwsLambdaHttpResponse({ callback }).error();
};
/*
callback(null, { 
    statusCode: 500
});
*/
```

#### Status customizado.

```js
module.exports.handler = (event, context, callback) => {
  new AwsLambdaHttpResponse({ callback }).custom({ status: 400 });
};
/*
callback(null, { 
    statusCode: 400
});
*/
```
