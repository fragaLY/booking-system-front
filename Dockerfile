FROM tiangolo/node-frontend:10 as build-stage
MAINTAINER vadzim.kavalkou@gmail.com
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

FROM nginx:1.17
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
ADD nginx/nginx.conf /etc/nginx/conf.d/default.conf

ENV LOCALHOST_PORT=8080
EXPOSE ${LOCALHOST_PORT}