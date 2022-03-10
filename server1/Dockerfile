FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm install mysql --save

COPY . .

EXPOSE 5001

CMD ["npm", "start"]