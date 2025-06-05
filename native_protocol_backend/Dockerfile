FROM node:latest AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY pnpm-lock.yaml* package.json ./ 
RUN pnpm install
COPY . .
RUN pnpm prisma generate && pnpm build 


FROM node:22.16.0-alpine3.22 AS runner
WORKDIR /app
COPY --from=builder /app/build/. .
COPY --from=builder /app/package.json ./
RUN npm i --omit=dev
COPY --from=builder /app/prisma/. /app/prisma/
RUN npx prisma generate
ENV NODE_ENV=production
CMD ["node", "main.js"]
