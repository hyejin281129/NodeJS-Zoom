// fontend와 backend의 연결
// webSocket 연결
const socket = new WebSocket(`wss://${window.location.host}`);
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");


// 서버가 연결 되었을 때
socket.addEventListener("open", () => {
  console.log("Connected to Server!!");
});

// 메세지를 받았을 때
socket.addEventListener("message", (message)=> {
  console.log("New message: ", message.data);
});

// 서버가 닫혔을 때
socket.addEventListener("close", () => {
  console.log("Connected from Server...x")
});


// 즉시 실행되지 않게 적용한채 메시지 전송해보기
// setTimeout(() => {
//   socket.send("hello from the browser!");
// }, 10000);

function handleSubmit(event){
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);