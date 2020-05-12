FROM node:12.16.1
WORKDIR /App
ADD . /App
RUN npm install
RUN chmod 755 /App/wait-for-it.sh
ENV PORT 3000
ENV IP "13.58.217.70"
CMD ["./wait-for-it.sh"]