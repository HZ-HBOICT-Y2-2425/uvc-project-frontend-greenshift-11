# Use the latest LTS version of Node.js
FROM node:lts

# Create a user and a group
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Set the working directory
WORKDIR /app

# Copy and install the dependencies
COPY package*.json ./
RUN npm install

# Copy the application source code
COPY . .

# Change the ownership of the working directory to the new user
RUN chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser

# Expose the correct port
EXPOSE 5173

# Define the health check
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD curl -f http://localhost:5173/ || exit 1

# Run the application
CMD ["npm", "run", "dev"]