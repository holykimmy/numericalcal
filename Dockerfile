FROM node:15-alpine as build-stage
WORKDIR /app
COPY . ./
RUN npm run build

FROM nginx
COPY --from=build-stage /app/build /usr/share/nginx/html
