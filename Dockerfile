# Use Node js 20 Alpine for better security
FROM node: 20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package* json ./

# Install all dependencies (needed for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN pm run build

# Remove dev dependencies after build
RUN pm prune --production

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]