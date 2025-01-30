# Use Node.js official image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy entire project
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
