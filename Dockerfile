FROM node:10-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
RUN yarn
RUN yarn global add @adonisjs/cli
RUN adonis migration:run
RUN adonis seed
EXPOSE 3333
CMD ["adonis", "serve", "--dev"]
