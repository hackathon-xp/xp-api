FROM node:8.5
WORKDIR /app
RUN npm install -g pm2
CMD ["pm2-docker","index.js"]
EXPOSE 8080
