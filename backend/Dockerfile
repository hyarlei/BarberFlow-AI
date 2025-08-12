FROM node:18-alpine

# Set working directory
WORKDIR /app

# Instalar dependências necessárias para o Prisma
RUN apk add --no-cache openssl libc6-compat

# Copy package files
COPY package*.json ./

# Install all dependencies including devDependencies needed for the build
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Prune devDependencies to reduce image size
RUN npm prune --omit=dev && npm cache clean --force

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:prod"]
