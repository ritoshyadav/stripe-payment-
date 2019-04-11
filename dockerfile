FROM node:carbon
# Create app directory
WORKDIR /server/server
# Install app dependencies
COPY package*.json ./
RUN npm install
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 8080

CMD [ "npm", "start" ]