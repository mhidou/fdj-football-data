FROM node:16-alpine

WORKDIR /app

RUN npm install -g @angular/cli@13

COPY package.json package-lock.json ./
RUN npm ci
