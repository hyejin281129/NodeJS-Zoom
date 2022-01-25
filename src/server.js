import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");

// public
app.use("/public", express.static(__dirname + "/public"));

// route
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// 같은 서버에서 http, WebSocket 전부 작동
// ws 서버만 만들어도 WebSocket은 작동 함
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketClose() {
  console.log("Disconneted from the Browser")
}

function onSocketMessage(message){
  console.log(message.toString("utf-8"));
}

// JS만 이용해서 채팅을 만들기 위한 작업
wss.on("connection", (socket) => {
  // 메세지 전송 
  console.log("Connected to Browser");
  socket.on("close", onSocketClose);
  socket.on("message", onSocketMessage);
  socket.send("hello!");
});

server.listen(3000, handleListen);

// express 방식
// app.listen(3000, handleListen);