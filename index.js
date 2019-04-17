const ws = new WebSocket('ws://localhost:8081');
ws.onopen = () => {
	console.log('websocket 已连接！');
	ws.send('我是客户端！');
};
ws.onmessage = (e) => {
	const div = document.createElement('div');
	div.innerHTML = '收到服务端的消息：' + e.data;
	document.body.appendChild(div);
};

window.ws = ws;