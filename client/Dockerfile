FROM node as build
WORKDIR /app
COPY package*.json ./
RUN yarn cache clean && yarn --update-checksums
COPY ./ .
RUN yarn && yarn build

FROM nginx:alpine
RUN mkdir /app
COPY --from=build /app/build /app
RUN rm /etc/nginx/conf.d/*
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]