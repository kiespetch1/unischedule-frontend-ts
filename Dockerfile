FROM node:23.8.0-alpine AS build

WORKDIR /app

ARG VITE_IDENTITY_URL
ARG VITE_SCHEDULE_URL
ARG VITE_EVENTS_URL

ENV VITE_IDENTITY_URL=${VITE_IDENTITY_URL}
ENV VITE_SCHEDULE_URL=${VITE_SCHEDULE_URL}
ENV VITE_EVENTS_URL=${VITE_EVENTS_URL}

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

FROM node:23.8.0-alpine AS production

WORKDIR /app
COPY --from=build /app/dist ./dist

COPY package*.json ./
RUN npm install --only=production
EXPOSE 3001
RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3001"]
