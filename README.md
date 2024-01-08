<h1>Create an object in GameMakerStudio</h1>
<h2>On Create Event</h2>
<code>
  socket = network_create_socket(network_socket_ws);
  url = "localhost";
  port = 8080;
  network_connect_raw_async(socket, url, port);
</code>

<h2>On Async-Networking Event</h2>
<code>
  var type = async_load[? "type"]; // type of signal
  switch (type) {
        // ON CONNECT
  	case network_type_non_blocking_connect:
  		  // Do this when connected
  		show_message("ws connected");
  		send_event("greetings", {}); // this will be sent instantly on connecting.
  	break;
        // MESSAGES RECIEVED
    case network_type_data:
        // Handle received data as a map
  	var recievedEvent = recieve_event(async_load[? "buffer"])// map
  	    // Actions by recivedEvent eventName
  	switch( recievedEvent[? "eventName"]){
  		case "#greetings":
  			//do this
  			show_message(recievedEvent[? "message"]); // the message recieved after connecting.
  		break;
  	}
  	break;
  	// ON DISCONNECTING
    case network_type_disconnect:
      // Handle disconnection
      show_message("Disconnected from WebSocket server");
    break;
  }

</code>

<h3>Create 2 scripts</h3>
<h4>recieve_event</h4>
<code>
  function recieve_event( _buffer ){
  	var buffer_raw = _buffer
  	var buffer_processed = buffer_read(buffer_raw, buffer_text);
  	var realData = json_decode(buffer_processed);
	return realData;
}
</code>
<h4>send_event</h4>
<code>
 function send_event(_eventName, _data){
	var Buffer = buffer_create(1, buffer_grow, 1);
	var data = ds_map_create();
	data[? "eventName"] = _eventName;
	data[? "payload"] = _data
	//do something
	buffer_write(Buffer, buffer_text, json_encode(data));
	network_send_raw(socket, Buffer, buffer_tell(Buffer));
	ds_map_destroy(data);
}
</code>
<hr>
  <h2>Add this script to your NodeJs code</h2>
  <code>
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
</code>
