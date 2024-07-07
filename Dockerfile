FROM node:20

WORKDIR /todoApp

COPY . .


RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]




