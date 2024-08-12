FROM node:18.20-alpine

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE  8000

ENTRYPOINT [ "npm", "run"]

CMD [ "dev" ]
