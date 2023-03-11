FROM node:16.14.2-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM node:16.14.2-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE ${API_PORT}
CMD [ "yarn", "run", "start:prod" ]