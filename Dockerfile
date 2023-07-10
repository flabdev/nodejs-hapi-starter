# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm ci 

# Copies everything over to Docker environment
COPY . ./

EXPOSE 5000

CMD ["npm", "start"]


