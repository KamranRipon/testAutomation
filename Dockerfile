FROM cypress/base:10.18.0

#ENV http_proxy="http://wall.lit.hamburg.de:80/"
#ENV https_proxy="http://wall.lit.hamburg.de:80/"

ENV http_proxy  = "http://10.61.16.6:3128"
ENV https_proxy = "http://10.61.16.6:3128"

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install

RUN apt-get update -y \
    && apt-get install curl -y \
    && apt-get install -y \
    docker \
    docker-compose \
    python3 \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb


RUN $(npm bin)/cypress verify

# RUN $(npm bin)/cypress run  --browser electron

# RUN npm run CyTest

RUN docker-build.sh