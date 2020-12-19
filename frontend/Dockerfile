FROM node:12
RUN npm install -g @angular/cli

WORKDIR /usr/src/app
COPY . .
RUN npm install -q

EXPOSE 4200
CMD ["node", "run-script", "ng", "build"]
