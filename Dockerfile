FROM node:20-slim

WORKDIR /usr/src/app

copy package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 7000

CMD ["npm", "start"]