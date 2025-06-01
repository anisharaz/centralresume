FROM node:latest AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY pnpm-lock.yaml* package.json prisma ./ 
RUN pnpm install

COPY . .

RUN pnpm prisma generate 
RUN pnpm build 

# FROM node:alpine AS runner
#
# RUN corepack enable && corepack prepare pnpm@latest --activate
#
# ENV NODE_ENV=production
#
# WORKDIR /app
#
# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/pnpm-lock.yaml ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/next.config.js ./next.config.js
# COPY --from=builder /app/prisma ./prisma
#
# CMD ["pnpm", "start"]
