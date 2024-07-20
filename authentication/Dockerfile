FROM --platform=linux/amd64 node:20.12.0-alpine3.19

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY dist ./dist

EXPOSE 3000
CMD ["npm", "start"]