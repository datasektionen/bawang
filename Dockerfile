FROM node:22-alpine3.20 AS base

WORKDIR /app
ENV NODE_OPTIONS=--openssl-legacy-provider

# I dont know why, but when doing npm install in this Dockerfile, methone just gets cloned but there
# is no dist directory, which makes the build fail since there is nothing in methone to import.
# Also: cd:ing into node_modules/methone and running `npm i && npm run build` doesn't.
FROM base as methone-builder

RUN apk add git
RUN git clone https://github.com/datasektionen/methone .
RUN npm i
RUN npm run build

FROM base as builder

RUN apk add git
COPY package.json package-lock.json ./
RUN npm i
COPY --from=methone-builder /app/dist ./node_modules/methone/dist

COPY bin bin
COPY public public
COPY src src
COPY razzle.config.js .

ENV NODE_ENV=production
ARG RAZZLE_TAITAN_URL
ARG RAZZLE_CALYPSO_URL

RUN npm run build

FROM base

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/build build

CMD ["npm", "start"]
