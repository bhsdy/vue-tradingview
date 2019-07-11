<template>
    <div>
        <button @click="handle">点击发送TcpSocket</button>
    </div>
</template>
<script>
  import axios from 'axios';
  export default {
  data () {
    return {
      httpURL: "http://localhost:8022"
    }
  },
  created () {

  },
  destroyed: function () {

  },
  methods: {
    handle(){
        axios
          .get(this.httpURL)
          .then(game => {
           console.log("11111111",game)
          })
          .catch(e => console.log(e));
    },
  }
}
</script>
