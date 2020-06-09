import { getLocal } from './local';
import store from '../store';
import { SET_MESSAGE } from '../store/action-types';

class WS {
  constructor(config ={}) {
    this.url = config.url || 'vue.zhufengpeixun.cn';
    this.port = config.port || 80;
    this.protocol = config.protocol || 'ws';
    this.time = config.time || 30 * 1000;
    this.ws = null;
  }

  onopen() {
    this.send(JSON.stringify({
      type: 'auth',
      data: getLocal('token'),
    }))
  }

  onmessage = (e) =>  {
    let { type, data } = JSON.parse(e.data);
    switch(type) {
      case 'noAuth':
        console.log('没有权限');
        break;
      case 'heartCheck':
        this.checkServer();
        this.ws.send(JSON.stringify({ type: 'heartCheck' }));
        break;
      default:
        store.commit( SET_MESSAGE, data );
    }
  }

  onerror = () => {
    // 异常重启
    this.timeoutId = setTimeout(() => this.create(), 1000);
  } 

  onclose = () => {
    this.ws.close();
    this.timeoutId && clearTimeout(this.timeoutId);
  }

  create() {
    console.log(`${this.protocol}://${this.url}:${this.port}`);
    this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`);
    this.ws.onopen= this.onopen;
    this.ws.onmessage= this.onmessage;
    this.ws.onerror= this.onerror;
    this.ws.onclose= this.onclose;
  }

  checkServer() {
    clearTimeout(this.timer);
    // 去抖 断线重连
    this.timer = setTimeout(() => {
      this.onclose();
      this.onerror();
    }, this.time + 1000);
  }

  send(msg) {
    msg = typeof msg === 'string' ? msg : JSON.stringify(msg);
    this.ws.send(msg);
  }
}

export default WS;