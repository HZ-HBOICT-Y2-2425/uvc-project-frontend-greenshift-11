# Use the latest LTS version of Node.js
FROM node:lts

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173  
# Expose the correct port

CMD ["npm", "run", "dev"]