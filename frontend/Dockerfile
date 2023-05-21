### STAGE 1: Build ###
FROM node:17 as builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install -g @angular/cli
RUN npm ci

COPY . .
CMD ["npm", "run", "build"]

### STAGE 2: Run ###
FROM nginx:1.23-alpine AS ngi

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /usr/src/app/dist/angular-frontend /usr/share/nginx/html

EXPOSE 80