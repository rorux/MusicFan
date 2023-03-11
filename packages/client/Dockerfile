FROM node:16.14.2-alpine AS builder
WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html