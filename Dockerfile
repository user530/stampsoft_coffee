FROM node:21-alpine as builder

WORKDIR /builder

COPY package*.json .

RUN npm ci --omit=dev

COPY . .

RUN npm run build

FROM nginx

WORKDIR /vending

COPY --from=builder /builder/build .

CMD [ "/bin/sh", "-c", "sh", "echo", "'All done'"]