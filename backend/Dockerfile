FROM node:12

WORKDIR /usr/src/app
COPY . .
RUN npm install -q

EXPOSE 3000
CMD ["node", "./bin/www"]
