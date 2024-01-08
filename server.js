const WS = require('ws')
const port = 8080
const { randomText, randomNumber } = require("./randomGenerator")
const wss = new WS.Server({ port: port })


let players = [];

wss.on("connection", ws => {
    //on connection
    console.log("New player connected.");

    //recieving messages
    ws.on("message", Data => {
        let data = JSON.parse(Data);
        console.log(data)
        let event = JSON.stringify({
            eventName: "#greetings",
            message: "Message: #greetings from the server"
        })
        ws.send(event)
    });

    //on disconnection
    ws.on("close", () => {
        console.log("Player disconnected");
    });

    //error
    ws.onerror = () => {
        console.log("An error has ocurred.")
    }
});

console.log("Listening on", port);