FROM node:latest-alpine 
WORKDIR /app
COPY frontend/packege*.json ./
RUN npx create
COPY frontend/..