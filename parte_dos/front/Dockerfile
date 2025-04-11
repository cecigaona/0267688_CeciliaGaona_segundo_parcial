# front/Dockerfile

FROM node:23

# Set the working directory inside the container
WORKDIR /app

# Install dependencies (inside the container)
COPY package*.json ./
RUN npm install

# Copy all other project files
COPY . .

# Expose Vite's default dev port
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
