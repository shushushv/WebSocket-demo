const MAX_RECONNECT_TIME = 3;		// ws最大重连次数

class Socket {
	constructor (options) {
		this.url = options.url;
		this.socket = null;
		this.heartbeatInterval = null;
		this.isReconnecting = false;
		this.reconnectTime = 0;

		this.createWebSocket();
	}

	/**
	 * @description 创建ws通道
	 * @author wuxuanshu
	 * @date 2019-04-18
	 */
	createWebSocket () {
		try {
			this.socket = new WebSocket(this.url);
			this.bindEvents();
		} catch (e) {
			this.reconnect();
		}
	}

	/**
	 * @description 重连机制
	 * @author wuxuanshu
	 * @date 2019-04-18
	 * @returns
	 */
	reconnect () {
		if (this.isReconnecting || this.reconnectTime >= MAX_RECONNECT_TIME) return;
		console.error('ws通道异常，正直尝试重连...');

		this.reconnectTime++;
		this.isReconnecting = true;
		const timer = setTimeout(() => {
			this.createWebSocket();
			this.isReconnecting = false;
			clearTimeout(timer);
		}, 2000);
	}

	/**
	 * @description ws绑定事件
	 * @author wuxuanshu
	 * @date 2019-04-18
	 * @returns
	 */
	bindEvents () {
		if (!this.socket) return;

		this.socket.onclose = () => {
			this.reconnect();
		};
		
		this.socket.onerror = (e) => {
			this.reconnect();
		};

		this.socket.onopen = () => {
			this.heartbeatInterval && clearInterval(this.heartbeatInterval);
			this.heartbeat();
			this.reconnectTime = 0;
		};

		this.socket.onmessage = (msg) => {
			console.log(msg && msg.data);
		};
	}

	/**
	 * @description ws心跳机制
	 * @author wuxuanshu
	 * @date 2019-04-18
	 */
	heartbeat () {
		this.heartbeatInterval = setInterval(() => {
			if (this.socket) {
				this.send(JSON.stringify({
					request: 'heartbeat'
				}));
			}
		}, 10000);
	}

	/**
	 * @description 发送信息
	 * @author wuxuanshu
	 * @date 2019-04-18
	 * @param msg
	 */
	send (msg) {
		this.socket.send(msg);
	}
}

export default Socket;