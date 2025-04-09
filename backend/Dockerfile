#use nodejs 
FROM node:22-alpine

#set working directory
WORKDIR /app

#copy package.json and install dependencies
COPY  package.json package-lock.json ./
RUN npm install

#copy the rest of the app
COPY . .

#exopose the port where server server runs
EXPOSE 5000

#start the backend server

CMD [ "npm","start" ]