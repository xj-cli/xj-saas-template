<template>
  <div>
    <el-row>
      <el-col class='title'>
        <h2>欢迎注册</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='12' :offset='7'>
        <el-form ref="regForm" :model="regForm" label-width="100px" :rules='rules'>
        <el-form-item label="邮箱" prop='username'>
          <el-input 
            v-model="regForm.username"
            type='text'
            palceholder='请输入邮箱'
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input 
            v-model="regForm.password"
            type='password'
            palceholder='请设置密码'
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop='repassword'>
          <el-input 
            v-model="regForm.repassword"
            type='password'
            palceholder='请确认密码'
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('regForm')">注册</el-button>
          <el-button @click='resetForm("regForm")'>重置</el-button>
        </el-form-item>
      </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { createNamespacedHelpers } from 'vuex';
// const { mapActions } = createNamespacedHelpers('user');
// import { LOGIN } from '@/store/action-types'
import { reg } from '@/api/user';

export default {
    name: 'register',

    data() {
      const checkUsername = (rule, value, callback) => {
        if (!value) return callback(new Error('用户名不正确'));
        callback();
      };
      const checkPasswrod = (rule, value, callback) => {
        if (!value) return callback(new Error('密码不能为空'));
        if (this.regForm.repassword) this.$refs.regForm.validateField('repassword');
        callback();
      };
      const checkRepassword = (rule, value, callback) => {
        if (!value) return callback(new Error('请确认密码'));
        if (value !== this.regForm.password) return callback(new Error('两次输入密码不一致'));
        callback();
      };
      
      return {
        regForm: {
          username: '',
          password: '',
          repassword: '',
        },
        rules: {
          username: [{ validator: checkUsername, trigger: 'blur' }],
          password: [{ validator: checkPasswrod, trigger: 'blur' }],
          repassword: [{ validator: checkRepassword, trigger: 'blur' }],
        }
      }
    },

    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (!valid) return false;
          return this.reg();
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async reg() {
        try {
          await reg(this.regForm);
          this.$message({
            type: 'success',
            message: '注册成功了，去登陆'
          });
          this.$router.push('/login');
          return true;
        } catch(err) {
          this.$message({
            type: 'error',
            message: err,
          });
          return false;
        }
      }
    },
    
}
</script>

<style lang="scss">
  .title {
    padding: 20px 0;
    text-align: center;
    line-height: 50px;
  }
</style>