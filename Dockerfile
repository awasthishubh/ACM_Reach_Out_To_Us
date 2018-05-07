FROM node:9.11.1-alpine
MAINTAINER awasthishubh aw.shubh@gmail.com
WORKDIR /home/node/acm-reachout
COPY ./ ./
RUN npm install && npm install sails --global
EXPOSE 1337
CMD ["sails","lift"]