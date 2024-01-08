Remember to install Nodejs from: https://nodejs.org/en
Remember to: npm init -y
Install WS dependency: npm i ws
Run the server: npx nodemon server
Server will run on port 8080
The GMS client side will try to connect to localhost: 8080
Make sure the server is running before running the game
---

When the GMS client opens it will try to connect to the server.
When connected it will prompt a message letting you know it connected.
It will proceed to send a message to the server and the server will respond back with a message from the server.
