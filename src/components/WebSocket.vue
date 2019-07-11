<template>
    <div>
        <button @click="handle">点击发送webSocket</button>
        <button @click="closebut">关闭webSocket</button>
    </div>
</template>
<script>

import pako from "pako";

export default {
  data () {
    return {
      webSockt: null,
      resultList: [],
    }
  },
  created () {
    // 页面刚进入时开启长连接
    this.initWebSocket()
  },
  destroyed: function () {
    // 页面销毁时关闭长连接
    this.websocketclose()
  },
  methods: {
    handle () {
      let msg = {
        param:{
          commodityNo: "ETH_200",
          contractNo: "0531"
        },
        token: "111111",
        requestId: 1,
        cmd: "/quote/subscribe"
      };
      this.webSockt.send(JSON.stringify(msg));
      console.log("发送订阅")
    },
    initWebSocket () {
      let url = 'ws://localhost:7102/ws';// ws地址
      this.webSockt = new WebSocket(url);
      this.webSockt.onopen = this.websocketonopen;
      this.webSockt.onerror = this.websocketonerror;
      this.webSockt.onmessage = this.websocketonmessage;
      this.webSockt.onclose = this.websocketclose;
      console.log(this.webSockt);
    },
    websocketonopen () {
      console.log('WebSocket连接成功')
    },
    websocketonerror (e) { // 错误
      console.log('WebSocket连接发生错误')
    },
    websocketonmessage (evt) { // 数据接收
      const _this = this;
      let result = null;
      if(evt.data instanceof Blob){
        //FileReader：从Blob对象中读取数据
        let reader = new FileReader();
        reader.onload = function() {
          //pako.inflate()对数据进行解压，得到正常的json对象
          _this.result = JSON.parse(pako.inflate(reader.result,{to:'string'}));
          if(_this.result.ping){
            //响应服务器，避免断开连接
            _this.websock.send(JSON.stringify({pong:_this.result.ping}));
          }
        }
        //将返回的数据解析为字符串格式
        reader.readAsBinaryString(evt.data);
      }
      console.log(_this.result)
      if(_this.result.data != null){
        _this.resultList.push(_this.result.data)
      }
    },
    websocketsend (agentData) { // 数据发送
      this.websock.send(agentData)
    },
    closebut(){
      this.websock.close();
      console.log(window.dataList)
    },
    websocketclose (e) { // 关闭
      console.log('connection closed (' + e.code + ')')
    },

  }
}
</script>
