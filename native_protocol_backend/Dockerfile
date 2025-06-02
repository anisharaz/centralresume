FROM node:latest AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY pnpm-lock.yaml* package.json ./ 
RUN pnpm install

COPY . .
COPY ./dockertmp/prisma ./prisma
COPY ./dockertmp/src/meta ./src/meta
RUN rm -rf ./dockertmp

RUN pnpm prisma generate 
RUN pnpm build 


FROM node:latest AS runner

WORKDIR /app

COPY --from=builder /app/build/. .
COPY --from=builder /app/node_modules ./node_modules

CMD ["npx","nodemon", "main.js"]
