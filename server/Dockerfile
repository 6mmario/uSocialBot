FROM node:12.16.1
WORKDIR /App
ADD . /App
RUN npm install
RUN chmod 755 /App/wait-for-it.sh
ENV PORT 3000
ENV IP "18.224.32.163"
CMD ["./wait-for-it.sh"]