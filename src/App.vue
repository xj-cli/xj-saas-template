<template>
  <div id="app">
    <el-container style="min-width:960px">
      <el-header>
        <PageHeader></PageHeader>
      </el-header>
      <el-main style="padding:0">
        <router-view></router-view>
      </el-main>
      <el-footer>
        <PageFooter></PageFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";

export default {
  name: 'app',
  components: {
    PageHeader,
    PageFooter,
  },

  created() {
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.el-header,.el-footer{
    background: #333;
    color:#fff
  }
.el-main{ 
  min-height: calc(100vh - 120px);
}
a {
  text-decoration: none;
}
</style>