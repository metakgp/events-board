# Use official Node.js image
FROM node:22-alpine

# Set timezone and working directory
RUN apk --no-cache add tzdata bash ca-certificates && \
    cp /usr/share/zoneinfo/Asia/Kolkata /etc/localtime && \
    echo "Asia/Kolkata" > /etc/timezone

WORKDIR /app

# Copy dependencies and install them
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy the rest of the backend code
COPY . .

# Make the Metaploy postinstall script executable
RUN chmod +x ./metaploy/postinstall.sh

# Expose the backend port
EXPOSE 8080

# Start the server via postinstall script
CMD ["./metaploy/postinstall.sh", "npm", "start"]
