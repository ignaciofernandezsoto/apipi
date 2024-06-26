FROM node:14-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

COPY .env ./

USER node

RUN npm install

COPY --chown=node:node . .

RUN npm run build

CMD [ "node", "dist/index.js" ]