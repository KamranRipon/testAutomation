FROM cypress/base:10.18.0
#FROM docker.artifactory-extern.dataport.de/cypress/base:10.18.0


#ENV http_proxy="http://wall.lit.hamburg.de:80/"
#ENV https_proxy="http://wall.lit.hamburg.de:80/"
ENV HTTP_PROXY="http://10.61.16.6:3128"
ENV HTTPS_PROXY="http://10.61.16.6:3128"
ENV NO_PROXY="git.dataport.de,sonarqube.dataport.de,127.0.0.1,minio.gitlab-runner-minio.svc.cluster.local,al.s3.dataport.de,docker:2375,docker:2376,artifactory-extern.dataport.de,localhost:80"

#ENV http_proxy="http://10.61.16.6:3128"
#ENV https_proxy="http://10.61.16.6:3128"

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN apt-get update -y \
    && apt-get install curl -y \
    && apt-get install -y \
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

#RUN apt-get install curl -y
#RUN apt-get -y install docker-compose
#RUN aptitude -y install docker-compose
#RUN curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose RUN chmod +x /usr/local/bin/docker-compose
RUN curl -L https://github.com/docker/compose/releases/download/1.20.0-rc2/docker-compose-`uname -s`-`uname -m` -o ./docker-compose
RUN chmod +x docker-compose
#RUN ln -s /usr/local/bin/docker-compose docker-compose
#RUN docker-compose.yml up -d
RUN npm install

#RUN $(npm bin)/cypress verify

# RUN $(npm bin)/cypress run  --browser electron

#RUN npm run CyTest

#RUN npm set registry https://artifactory-extern.dataport.de:443/artifactory/api/npm/common-npm-central-development