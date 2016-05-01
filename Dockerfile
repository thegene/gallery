FROM node:4.4.2
MAINTAINER Eugene Westbrook

RUN useradd gallery

# make the src dir and do npm install
RUN mkdir /src
COPY package.json /src
RUN cd /src && npm install

# Zombie processes
RUN wget -O /src/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.0.1/dumb-init_1.0.1_amd64
RUN chmod +x /src/dumb-init

# Copy and install the app
COPY app/ /src/app
COPY config/ /src/config
COPY gulpfile.js /src
RUN chown -R gallery:gallery /src/config

# https://github.com/rauchg/slackin/issues/136
ENV BABEL_CACHE_PATH=/babel/babel.json
RUN mkdir /babel
RUN chown -R gallery:gallery /babel

# /build volume
RUN mkdir /build
RUN chown -R gallery:gallery /build
VOLUME /build

# /config volume
RUN mkdir /config
RUN chown -R gallery:gallery /config
VOLUME /config

USER gallery
ENV BUILD_DIR=/build
ENV FORCE_CLEAN=true
ENV CONFIG_DIR=/config

WORKDIR /src
CMD ["./dumb-init", "./node_modules/gulp/bin/gulp.js"]
