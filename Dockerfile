FROM node:8.5
WORKDIR /app
RUN npm install -g pm2
EXPOSE 3000
