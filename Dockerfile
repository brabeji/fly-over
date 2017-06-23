FROM	ilagnev/alpine-nginx-lua

RUN     apk add --update nodejs bash git dnsmasq zlib zlib-dev libpng libpng-dev libwebp libwebp-dev libjpeg-turbo libjpeg-turbo-dev nasm build-base automake autoconf file ca-certificates && \
		update-ca-certificates
RUN     echo -e 'http://dl-cdn.alpinelinux.org/alpine/edge/main\nhttp://dl-cdn.alpinelinux.org/alpine/edge/community\nhttp://dl-cdn.alpinelinux.org/alpine/edge/testing' > /etc/apk/repositories
RUN     apk add --update yarn

WORKDIR	/opt/app
COPY 	package.json /opt/app/
COPY 	yarn.lock /opt/app/
RUN		yarn install --pure-lockfile

COPY 	src /opt/app/src
COPY 	.babelrc /opt/app/.babelrc
COPY 	webpack.config.js /opt/app/webpack.config.js
RUN		npm run build
#RUN		mkdir public/img/ && mv src/favicons/ public/

COPY	config/nginx.conf	/etc/nginx/nginx.conf

EXPOSE 	80
