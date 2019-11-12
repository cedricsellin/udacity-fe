# Starting from a base image
FROM "alpine"

# Install some packages
RUN apk add --update npm
RUN npm install
RUN npm install express
RUN npm install cors
RUN npm install body-parser
COPY ./ ./

# Run some commands
CMD ["npm", "start"]