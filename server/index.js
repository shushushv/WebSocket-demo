const app = require('express')();
const server = require('http').Server(app);
const Websocket = require('ws');

const wss = new Websocket.Server({ server, port: 8081} );

wss.on('connection', (ws) => {
	ws.on('message', (message) => {
		const data = JSON.parse(message);
		handleMessage(data);
	});

	function handleMessage (data) {
		if (typeof data === 'undefined') return;

		if (data.request === 'heartbeat') {
			ws.send(JSON.stringify({
				error: 0
			}));
		}
	}
});


app.listen(3000);