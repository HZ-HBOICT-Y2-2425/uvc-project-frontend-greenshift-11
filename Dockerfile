# Use the official Node.js 18 LTS image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files into the working directory
COPY . .

# Build the application (if your project has a build step)
RUN npm run build

# Expose the port your application runs on (update the port number as needed)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
