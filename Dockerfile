FROM mcr.microsoft.com/playwright:v1.10.0

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN npm install
ENTRYPOINT [ "/app/entrypoint.sh" ]