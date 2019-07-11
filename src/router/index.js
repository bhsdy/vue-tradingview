import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import WebSocket from '@/components/WebSocket'
import TcpSocket from '@/components/TcpSocket'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/WebSocket',
      name: 'WebSocket',
      component: WebSocket
    },
    {
      path: '/TcpSocket',
      name: 'TcpSocket',
      component: TcpSocket
    }
  ]
})
