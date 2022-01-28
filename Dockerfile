FROM cypress/base:10.18.0
#FROM docker.artifactory-extern.dataport.de/cypress/base:10.18.0

#ENV http_proxy="http://wall.lit.hamburg.de:80/"
#ENV https_proxy="http://wall.lit.hamburg.de:80/"
# ENV HTTP_PROXY="http://wall.lit.hamburg.de:80/"
# ENV HTTPS_PROXY="http://wall.lit.hamburg.de:80/"

ENV http_proxy="http://10.61.16.6:3128"
ENV https_proxy="http://10.61.16.6:3128"

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install
#RUN $(npm bin)/cypress verify

# RUN $(npm bin)/cypress run  --browser electron

#RUN npm run CyTest

#RUN npm set registry https://artifactory-extern.dataport.de:443/artifactory/api/npm/common-npm-central-development