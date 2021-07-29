# Cypress End-to-end tests for Conplat chatbot

## Local machine setup
```
npm install
```
Run Test
```
npm run Cy_test
```
Or
```
npx cypress open
```

## Run Test in a Docker Container

Build docker image 
```
bash docker-build.sh
```

Run tests 
```
docker-compose up
```