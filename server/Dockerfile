# Use the Node.js 18 Alpine image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install GCC, g++, Java, and Python
RUN apk update && apk add --no-cache g++ gcc openjdk11 python3

# Copy package.json to the working directory
COPY package.json .

COPY .env .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 4000

# Specify the command to run when the container starts
CMD ["node", "index.js"]
