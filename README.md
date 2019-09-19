# Тестовое

``` notepad
Написать веб-приложение для подсчета суммы корзины в разных валютах.
На фронтенде имеется корзина, в которую можно добавлять товары, которые имеют поля:
  name - строка,
  quantity - целое положительное число,
  currency - селект с опциями RUB, USD, EUR,
  price - положительное число

По нажатию на кнопку "Посчитать" товары отправляются на сервер, с которого, в формате JSON, приходит ответ, содержащий сумму цен товаров отображенную в разных валютах.
Пример ответа: {
  "RUB": 102,
  "EUR": 1.37,
  "USD": 1.55
}

Отобразить результаты. Для конвертации валют можно использовать API https://www.cbr-xml-daily.ru/daily_json.js
На фронтенде использовать что угодно, на бекенде Express. Код можно расположить на github.

```

Бойлерплейт для express взят тут https://github.com/danielfsousa/express-rest-es2017-boilerplate

## Вырезаны

- Аутификация.
- Docker

## Обязательно иметь

- [Node v7.6+](https://nodejs.org/en/download/current/)
- [Yarn](https://yarnpkg.com/en/docs/install)

## Инстукции

#### Установка зависимостей:

```bash
yarn
```

#### Установка переменных окружения:

```bash
cp .env.example .env
```

## Локальный запуск

- Сервера

```bash
yarn dev:server
```

- Клиентской части

```bash
yarn dev:front
```

## Запуск продакшн сервера

```bash
yarn start
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix

# lint and watch for changes
yarn lint:watch
```

## Тестирования

```bash
# run all tests with Mocha
yarn test

# run unit tests
yarn test:unit

# run integration tests
yarn test:integration

# run all tests and watch for changes
yarn test:watch

# open nyc test coverage reports
yarn coverage
```

## Validate

```bash
# run lint and tests
yarn validate
```

## Logs

```bash
# show logs in production
pm2 logs
```

## Documentation

```bash
# generate and open api documentation
yarn docs
```
