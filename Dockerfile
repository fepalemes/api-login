FROM node:12-buster-slim

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

RUN npm install express

ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/Localtime && echo $TZ > /etc/timezone

COPY . .

EXPOSE 3500

RUN npm rebuild bcrypt

CMD ["npm", "start"]

