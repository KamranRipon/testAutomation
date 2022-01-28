FROM cypress/base:10.18.0

ENV http_proxy="http://wall.lit.hamburg.de:80/"
ENV https_proxy="http://wall.lit.hamburg.de:80/"
ENV HTTP_PROXY="http://wall.lit.hamburg.de:80/"
ENV HTTPS_PROXY="http://wall.lit.hamburg.de:80/"

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install

RUN $(npm bin)/cypress verify

# RUN $(npm bin)/cypress run  --browser electron


RUN npm run CyTest