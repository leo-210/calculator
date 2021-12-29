FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM arm64v8/node:16-slim

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY src ./src
COPY res ./res
COPY package.json .

CMD ["/app/src/index.js"]
