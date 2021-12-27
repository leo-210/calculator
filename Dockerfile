FROM node:16-alpine as build

WORKDIR /app

COPY package*.json .
RUN npm i --only_prod

FROM gcr.io/distroless/nodejs:16

WORKDIR /app

COPY --from=build /app/node_modules .
COPY ["src", "res", "./"]

CMD ["/app/src/index.js"]
