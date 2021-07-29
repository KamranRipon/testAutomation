#!/bin/sh



sudo docker build --no-cache --build-arg HTTP_PROXY=$HTTP_PROXY --build-arg HTTPS_PROXY=$HTTPS_PROXY --build-arg NO_PROXY=$NO_PROXY --label built-by=$USER -t cypress .
sudo docker rmi $(docker images --quiet --filter "dangling=true")