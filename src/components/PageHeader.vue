<template>
  <el-row class="header-row">
    <el-col :span="16">
      <img src="@/assets/logo.png" class="logo" />
      <el-menu
        class="menu"
        mode="horizontal"
        background-color="#333"
        text-color="#fff"
        active-text-color="fff"
      >
        <el-menu-item index="/">
          <router-link to='/'>首页</router-link>
        </el-menu-item>
        <el-menu-item index="post">
          <router-link to='/post'>
            发表文章
          </router-link>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="8">
      <div class="nav-right">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#333"
          text-color="#fff"
          active-text-color="fff"
        >
          <template v-if='!hasPermission'>
            <el-menu-item index="login">
              <router-link to='/login'>Login</router-link>
            </el-menu-item>
            <el-menu-item index="reg">
              <router-link to='/reg'>Register</router-link>
            </el-menu-item> 
          </template>
          <el-submenu v-else index='user'>
            <template slot="title">{{ userInfo.username }}</template>
            <el-menu-item index="manager">
              <router-link to='/manager'>后台管理</router-link>
            </el-menu-item>
            <el-menu-item @click='logout' index='logout'>退出登陆</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('user');
import { USER_LOGOUT } from '../store/action-types';

export default {
  name: 'page-header',

  computed: {
    ...mapState([ 'userInfo' , 'hasPermission']),
  },
  methods: {
    ...mapActions([ USER_LOGOUT ]),
    async logout() {
      await this[USER_LOGOUT]();
      this.$message({
        type: 'success',
        message: '退出成功'
      });
      setTimeout(() => this.$router.push('/login'), 1000);
    }
  },
}
</script>

<style lang="scss">
.header-row {
  height: 100%;
  .logo {
    margin: 5px;
    height: 50px;
  }
  .menu,
  .logo {
    display: inline-block;
  }
  .nav-right {
    float: right;
    li {
      display: inline-block;
      text-align: center;
      line-height: 60px;
    }
    a {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>