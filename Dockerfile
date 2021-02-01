FROM nginx:1.19.6 AS deploy-stage
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html/rvau
COPY ./dist/ .