import Socket from './src/socket';

const ws = new Socket({ url: 'ws://localhost:8081' });

window.ws = ws;