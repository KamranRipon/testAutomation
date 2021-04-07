#!/bin/sh

docker image build -f Dockerfile \
	--build-arg HTTP_PROXY=$http_proxy --build-arg HTTPS_PROXY=$https_proxy \
	--build-arg http_proxy=$http_proxy --build-arg https_proxy=$https_proxy \
	-t conplat/e2etests:local .