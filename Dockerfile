FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm add -D vitepress vue

RUN npm install

EXPOSE 3000

CMD ["/bin/sh", "-c", "npm run env -- vitepress dev --host 0.0.0.0 --port 3000"]
