# Start your image with a node base image
FROM node:20

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Copy local directories to the current local directory of our docker image (/app)
COPY ./src ./src
COPY ./public ./public
COPY ./index.html ./index.html
COPY ./vite.config.ts ./vite.config.ts

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install \
    && npm install -g serve \
    && npm run build-only \
    && rm -rf node_modules

EXPOSE 3000

# Start the app using serve command
CMD [ "serve", "-s", "dist", "-l", "3000"]