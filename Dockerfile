FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm add -D vitepress vue

EXPOSE 3000

CMD ["/bin/sh", "-c", "if [ \"$AUTH_KEY\" = \"sxc9c79wed\" ]; then npm run env -- vitepress dev --host 0.0.0.0 --port 3000; else echo 'Invalid AUTH_KEY'; exit 1; fi"]
