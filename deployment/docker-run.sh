#!/bin/sh

docker container run -it\
    -e http_proxy=$http_proxy -e https_proxy=$https_proxy \
    -e HTTP_PROXY=$http_proxy -e HTTPS_PROXY=$https_proxy \
    -e BASEURL='https://ai.dataport.de/conplat/chat/'\
    -e HEADLESS=true \
    -e BROWSER='webkit' \
    -e DEVICE='iPhone 11 Pro' \
    conplat/e2etests:local