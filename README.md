# Chatroom

> **Written By**: Mickael Alliel



> **Last Update**: 26/01/18

> **Stack**: Node.JS (socket.io, express.js), Vue.js

> **Live Demo**: [https://chatroom.mickaelalliel.com/](https://chatroom.mickaelalliel.com/)

## Purpose

> **Online Chatroom**

_Talk with multiple people at the same time, everything synchronized_


> **Non-Persistant**

_Need a secure place to talk? Whip up the server and chat, when you're finished -- everything is wiped from the face of the earth_

> **Semi-Intelligent Chatbot**

_Rick - he may be not that old, but he is also ~~drunk~~ **tired** so all he can do is remember the answers to all your questions with his photographic memory, at least until he invents a new crazy device that makes him smarter_

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
# need the socket server, run `node server.js 8080` as well in a different terminal
npm run dev

# build for production with minification
npm run build

# run server for socket + chat app at localhost:8082 (default port, can choose with argument)
# requires `npm run build` beforehand
npm run prod [PORT]

# build for production and view the bundle analyzer report
npm run build --report

# test linting for all vue files
npm run lint

# run unit tests
npm run unit

# run all tests
npm test
```
