FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm i --only_prod

FROM gcr.io/distroless/nodejs:16

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY src ./src
COPY res ./res
COPY package.json .

CMD ["/app/src/index.js"]
