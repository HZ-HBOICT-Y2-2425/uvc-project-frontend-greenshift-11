# Dockerfile
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Expose the port (if needed for development)
EXPOSE 5173

# Define the command to run your app in development mode
CMD ["npm", "run", "dev"]