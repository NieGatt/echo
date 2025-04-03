FROM node:20-alpine

WORKDIR /app/backend

COPY ./package.json ./package-lock.json ./

RUN npm install

EXPOSE 3000

COPY . .

CMD ["npm", "run", "start:dev"]