FROM node:16

WORKDIR /wireguard-manager-gui
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]