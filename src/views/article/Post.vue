<template>
  <div>
    <h2>发表文章</h2>
    <el-input 
      placeholder='请输入要发送给用户的信息'
      v-model='msg'
    ></el-input>
    <el-button @click='ws.send(msg)'>发送</el-button>
    <p>WebSocket 服务信息：{{message}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      msg: ''
    }
  },
  computed: {
    ...mapState([ 'message', 'ws' ]),
  },

}
</script>