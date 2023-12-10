# Build stage
FROM node:16 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Serve stage
FROM node:16

WORKDIR /app

COPY --from=build-stage /app/dist /app/dist
COPY server.js /app/server.js

# Install Express
RUN npm install express

EXPOSE 4000

CMD ["node", "server.js"]
