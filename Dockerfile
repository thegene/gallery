FROM node:4.4.2
MAINTAINER Eugene Westbrook

# Copy and install the app
RUN mkdir /app
COPY app/ /app
COPY config/ /app
COPY gulpfile.js /app
COPY package.json /app
WORKDIR /app
RUN npm install

# Zombie processes
RUN wget -O dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.0.1/dumb-init_1.0.1_amd64
RUN chmod +x dumb-init

RUN useradd gallery

# https://github.com/rauchg/slackin/issues/136
ENV BABEL_CACHE_PATH=/babel/babel.json
RUN mkdir /babel
RUN chown -R gallery:gallery /babel

# Build the app
RUN mkdir /build
RUN chown -R gallery:gallery /build
VOLUME /build
USER gallery
ENV BUILD_DIR=/build

CMD ["./dumb-init", "./node_modules/gulp/bin/gulp.js", "build"]
