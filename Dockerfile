FROM node:4.4.2
MAINTAINER Eugene Westbrook

RUN useradd gallery

# make the src dir and do npm install
RUN mkdir /app
COPY package.json /app
RUN cd /app && npm install

# Copy and install the app
COPY app/ /app/app
COPY gulpfile.js /app

# https://github.com/rauchg/slackin/issues/136
ENV BABEL_CACHE_PATH=/babel/babel.json
RUN mkdir /babel
RUN chown -R gallery:gallery /babel

# /build volume
RUN mkdir /build
RUN chown -R gallery:gallery /build
VOLUME /build

RUN mkdir /app/config
RUN chown gallery:gallery /app/config

USER gallery
ENV BUILD_DIR=/build
ENV FORCE_CLEAN=true
ENV CONFIG_DIR=/config

WORKDIR /app
CMD ["node_modules/gulp/bin/gulp.js"]
