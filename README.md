# MusicFan

Приложение для любителей музыки

## Как запустить приложение?

Первым делом необходимо отредактировать файлы `.env.development.sample` и `.env.production.sample`.

На основе этих файлов будут конфигурироваться переменные окружения.

### Основные команды

- `yarn bootstrap` - установка библиотек на клиенте и на сервере, автоматическая настройка окружения на основе конфигураций файлов `.env.development.sample`, `.env.production.sample`;
- `yarn start` - запуск клиента и сервера в режиме разработки;
- `yarn start:client` - запуск клиента в режиме разработки;
- `yarn start:server` - запуск сервера в режиме разработки;
- `yarn build` - production-сборка клиента и сервера;
- `yarn build:client` - production-сборка клиента;
- `yarn build:server` - production-сборка сервера.

**Frontend** по умолчанию работает на порту 5173.

**Backend** по умолчанию работает на порту 3000.

## Docker

### Production

1. `yarn init:env` - настройка окружения.
2. `docker compose --env-file ./.env.production up` - разворачивание сервисов в режиме production (**client**, **server**, **postgres**, **pgadmin**)

### Development

1. `yarn init:env` - настройка окружения.
2. `docker compose --env-file ./.env.development up db dbadmin` - разворачивание БД в режиме development (**postgres**, **pgadmin**)

**PostgreSQL** по умолчанию работает на порту 5432.

**pgAdmin** по умолчанию работает на порту 5050.

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
