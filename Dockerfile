# Use the official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the client code
COPY . .

RUN npm install -g prisma

# Generate Prisma Client
RUN npx prisma generate

RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Command to run the production server
CMD ["npm", "start"]
