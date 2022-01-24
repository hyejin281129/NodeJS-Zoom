import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");

// public
app.use("/public", express.static(__dirname + "/public"));

// 라우터
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// 같은 서버에서 http, WebSocket 전부 작동
// ws 서버만 만들어도 WebSocket은 작동 함
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

server.listen(3000, handleListen);

// express 방식
// app.listen(3000, handleListen);