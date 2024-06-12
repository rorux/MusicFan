FROM node:18.20.3-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM node:18.20.3-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE ${API_PORT}
CMD [ "yarn", "run", "start:prod" ]