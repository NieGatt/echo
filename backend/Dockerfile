FROM node:22

WORKDIR /api

COPY ./package.json ./package-lock.json ./

RUN npm install

EXPOSE 3000

COPY . .

CMD ["npm", "run", "start:dev"]