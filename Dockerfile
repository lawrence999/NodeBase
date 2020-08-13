# build & code linting stage
FROM node:12
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
EXPOSE 5000
