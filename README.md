# MusicFan

Приложение для любителей музыки

## Как запустить приложение?

- `yarn bootstrap` - установка пакетов на клиенте и на сервере;
- `yarn start:dev` - запуск клиента и сервера в режиме разработки;
- `yarn start:dev:client` - запуск клиента в режиме разработки;
- `yarn start:dev:server` - запуск сервера в режиме разработки;
- `yarn start:prod` - сборка клиента и сервера в режиме production, запуск сервера.

## Линтеры и тесты

- `yarn lint` - проверки **Eslint** на клиенте и на сервере (+ **Stylelint** на клиенте);
- `yarn format` - форматирование **Prettier** на клиенте и на сервере;
- `yarn test:cov` - запуск тестов на клиенте и на сервере.

## Установка зависимостей

- `yarn lerna add {dep}` - установка на клиент и на сервер;
- `yarn lerna add {dep} --scope client` - установка на клиент;
- `yarn lerna add {dep} --scope server` - установка на сервер;
- `yarn lerna add --dev {dep}` - установка в `devDependencies` на клиент и на сервер;
- `yarn lerna add --dev {dep} --scope client` - установка в `devDependencies` на клиент;
- `yarn lerna add --dev {dep} --scope server` - установка в `devDependencies` на сервер;
