FROM node

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
COPY .env ./dist

EXPOSE 4000

CMD ["npm", "start"]