FROM node:latest
# replace this with your application's default port
EXPOSE 3000

# Install app dependencies npm
COPY app/package.json /src/package.json
RUN cd /src; npm install

COPY app/. /src
WORKDIR /src

CMD ["node", "./bin/www"]
