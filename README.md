# MusicFan

Приложение для любителей музыки

## Как запустить приложение?

- `yarn bootstrap` - установка пакетов на клиенте и на сервере;
- `yarn start` - запуск клиента и сервера в режиме разработки;
- `yarn start:client` - запуск клиента в режиме разработки;
- `yarn start:server` - запуск сервера в режиме разработки;
- `yarn build` - production-сборка клиента и сервера;
- `yarn build:client` - production-сборка клиента;
- `yarn build:server` - production-сборка сервера.

В режиме разработки:

- **client**: localhost:5173;
- **server**: localhost:3000;

## Линтеры и тесты

- `yarn lint` - проверки **Eslint** на клиенте и на сервере (+ **Stylelint** на клиенте);
- `yarn lint:fix` - проверки **Eslint** и **Stylelint** с правками кода;
- `yarn format` - форматирование **Prettier** на клиенте и на сервере;
- `yarn test:cov` - запуск тестов на клиенте и на сервере.

## Установка зависимостей

- `yarn lerna add {dep}` - установка на клиент и на сервер;
- `yarn lerna add {dep} --scope client` - установка на клиент;
- `yarn lerna add {dep} --scope server` - установка на сервер;
- `yarn lerna add --dev {dep}` - установка в `devDependencies` на клиент и на сервер;
- `yarn lerna add --dev {dep} --scope client` - установка в `devDependencies` на клиент;
- `yarn lerna add --dev {dep} --scope server` - установка в `devDependencies` на сервер;
