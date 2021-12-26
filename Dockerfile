FROM node:14
WORKDIR /app

COPY . .

RUN /bin/bash deployment-build.sh

WORKDIR /app/Server
CMD ["node", "app.js"] 
