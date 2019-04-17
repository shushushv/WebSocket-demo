const app = require('express')();
const server = require('http').Server(app);
const Websocket = require('ws');

const websocket = new Websocket.Server({ server, port: 8081} );

websocket.on('connection', (ws) => {
	ws.on('message', (message) => {
		console.log(message);
	});

	ws.send('hello word!');
});

app.listen(3000);