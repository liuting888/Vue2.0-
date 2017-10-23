<template>
    <div class="tmpl" >
            <el-col :span="8" :offset=7 class="martop">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="uname">
                <el-input v-model="ruleForm2.uname" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="upwd">
              <el-input type="password" v-model="ruleForm2.upwd" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
    </div>
</template>

<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {

                    callback();
                }
            };
            var validateUname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    upwd: '',
                    uname: '',
                },
                rules2: {
                    upwd: [{
                        required: true,
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    uname: [{
                        required: true,
                        validator: validateUname,
                        trigger: 'blur'
                    }]
                }
            };
        },
        mounted() {
            document.getElementsByTagName('body')[0].style.backgroundColor = "#0094ff";
        },
        beforeDestroy() {
            document.getElementsByTagName('body')[0].style.backgroundColor = "white";
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/admin/account/login', this.ruleForm2).then(res => {
                            if (res.data.status == 1) {
                                this.$message.error(res.data.message);
                                return;
                            } else {
                                this.$router.push({
                                    name: 'layout'
                                })
                            }
                        })
                    } else {
                        alert('账户名或者密码不正确!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style scoped>
    .martop {
        margin-top: 150px;
    }
</style>