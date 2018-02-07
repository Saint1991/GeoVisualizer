FROM nginx:1.13.8-alpine

COPY index.html /usr/share/nginx/html/index.html
COPY bower_components /usr/share/nginx/html/bower_components
COPY css /usr/share/nginx/html/css
COPY images /usr/share/nginx/html/images
COPY js /usr/share/nginx/html/js
COPY views /usr/share/nginx/html/views

ENTRYPOINT ["nginx", "-g", "daemon off;"]
