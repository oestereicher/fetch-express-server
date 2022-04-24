FROM node:14.16.0 AS ui-build
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install
RUN npm i -g @angular/cli
EXPOSE 3000
EXPOSE 4200

CMD echo "Warming up" && sleep 5 && npm run begin