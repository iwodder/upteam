FROM node:12

WORKDIR /usr/src/app
COPY . .
RUN npm install

WORKDIR ./frontend
RUN npm install
RUN ng build

EXPOSE 3000
CMD ["node", "./bin/www"]
