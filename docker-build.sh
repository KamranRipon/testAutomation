#sudo docker build --no-cache --build-arg HTTP_PROXY=$HTTP_PROXY --build-arg HTTPS_PROXY=$HTTPS_PROXY --build-arg NO_PROXY=$NO_PROXY --build-arg http_proxy=$HTTP_PROXY --build-arg https_proxy=$HTTPS_PROXY --build-arg no_proxy=$NO_PROXY --label built-by=$USER -t conplat/cci-backend .
#sudo docker rmi $(docker images --quiet --filter "dangling=true")

### Stop running container
# sudo docker stop <container name> && sudo docker rm <container name>
### docker run command
# sudo docker run -t -d -P -v <target directory>:<source directory> --name <container name> <image name>
### copy command
# sudo docker cp <container name>:<source directory in container> <targate directory>

#sudo docker login -u srv-ai-contributor -p Dataport2020! dchatbot-docker-development.artifactory-extern.dataport.de
sudo docker-compose down
sudo docker-compose up -d
#npm run CyTest --browser /usr/bin/chromium
#npm run CyTest -- --browser chromium
#node_modules/.bin/cypress open
npm run delete:reports
npx cypress run --headed --browser chrome
npm run merge 
sudo docker-compose down