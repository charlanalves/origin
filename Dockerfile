FROM node:latest

# set application root directory
ENV APP_HOME /TDD

# Create app directory
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# environment to development
ENV NODE_ENV development

# Install app dependencies
COPY package.json $APP_HOME
RUN npm install

# Bundle app source
COPY . $APP_HOME

COPY __config.js $APP_HOME
EXPOSE 8084
CMD [ "npm", "start" ]
