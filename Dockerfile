FROM node:16

WORKDIR /build
COPY . .
RUN true \
 && yarn install \
 && yarn build \
 && true

FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /build/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
