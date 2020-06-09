<template>
    <div class='login-page'>
        <el-row>
            <el-col class='title'>
                <h2>欢迎登陆</h2>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='10' :offset='7'>
                <el-form
                    :model='ruleForm'
                    status-icon
                    :rules='rules'
                    ref='ruleForm'
                    label-width='100px'
                    class='demo-ruleForm'
                >
                    <el-form-item label='请输入邮箱' prop='username'>
                        <el-input 
                            v-model='ruleForm.username'
                            placeholder="请输入邮箱"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="请输入密码" prop='password'>
                        <el-input
                            type='password'
                            v-model="ruleForm.password"
                            placeholder='请输入密码'
                            autocomplete='off'
                        ></el-input>
                    </el-form-item>
                    <el-form-item label='验证码' prop='code'>
                        <el-row>
                            <el-col :span='6'>
                                <el-input 
                                    v-model='ruleForm.code'
                                    placeholder="验证码"
                                    autocomplete="off"
                                ></el-input>
                            </el-col>
                            <el-col :span='6' :offset='1'>
                                <div class='code' v-html='verify' @click='getCaptcha'></div>
                            </el-col>
                            <el-col :span='5' :offset='6'>
                                <el-button type='text' @click='$router.push("/forget")'>忘记密码？</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-button type='primary' @click='submitForm("ruleForm")'>登陆</el-button>
                        <el-button plain @click='resetForm("ruleForm")'>重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { v4 } from 'uuid';
import { getLocal, setLocal } from '@/utils/local';
import { getCaptcha } from '@/api/public';
import { createNamespacedHelpers } from 'vuex';
import { USER_LOGIN } from '../../store/action-types';

const { mapActions } = createNamespacedHelpers('user');

const checkFn = msg => (rule, value, callback) => {
    if (!value) return callback(new Error(msg));
    callback();
}

export default {
    name: 'login',

    data() {
        const checkUsername = checkFn('用户名不正确');
        const checkPassword = checkFn('请输入密码');
        const checkCode = checkFn('验证码长度必须为4');
        
        return {
            ruleForm: {
                username: '',
                password: '',
                code: ''
            },
            rules: {
                username: [{ validator: checkUsername, trigger: 'blur' }],
                password: [{ validator: checkPassword, trigger: 'blur' }],
                code: [{ validator: checkCode, trigger: 'blur' }],
            },
            verify: ''
        }
    },

    methods: {
        ...mapActions([ USER_LOGIN ]),
        submitForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    try {
                        await this[USER_LOGIN]({ ...this.ruleForm, uid: this.uid });
                        this.$message({
                            type: 'success',
                            message: '登陆成功，3 秒后跳转首页',
                        });
                        setTimeout(() => this.$router.push('/'), 3000);
                    } catch(error) {
                        console.log(error);
                        this.$message({
                            type: 'error',
                            message: error,
                        })
                    }
                } else {
                    return false;
                };
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        async getCaptcha() {
           let { data } = await getCaptcha();
           this.verify = data;
        }
    },
    
    async created() {
        this.uid = getLocal('uuid');
        if (!this.uid) setLocal('uuid', v4());
        this.getCaptcha();
    },
}
</script>

<style lang="scss">
.title {
    padding: 20px 0;
    text-align: center;
    line-height: 50px;
}
.code {
    cursor: pointer;
}
</style>