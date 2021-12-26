FROM node:14
WORKDIR /app

COPY . .

RUN /bin/bash deployment-build.sh

CMD /bin/bash -c "cd /app/Server && node app.js"
#CMD ["node", "/app/Server/app.js"] 
