FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY client/package.json ./client/package.json
COPY server/package.json ./server/package.json
RUN npm ci --omit=dev --workspace server

COPY server/src ./server/src

EXPOSE 5000
CMD ["node", "server/src/server.js"]
