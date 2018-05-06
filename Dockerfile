FROM node:9.11.1-alpine
MAINTAINER awasthishubh aw.shubh@gmail.com
COPY ./ /home/node/acm-reachout
RUN cd /home/node/acm-reachout && npm install && npm install sails --g