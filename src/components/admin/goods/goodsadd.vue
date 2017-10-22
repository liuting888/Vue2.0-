<template>
<div class="tmpl">
        <el-row>
                <el-col :span="24">
                    <div class="abread bt-line">
                        <!-- 使用elementUI中的面包屑导航组件完成 -->
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                            <el-breadcrumb-item>商品新增</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </el-col>
        </el-row>

        <el-row>
            <el-col :span="20" class="martop">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-col :span="12">
                            <el-form-item label="内容标题" prop="title">
                              <el-input v-model="ruleForm.title"></el-input>
                            </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                    <el-form-item label="副标题">
                                            <el-input v-model="ruleForm.sub_title"></el-input>
                                    </el-form-item>
                                </el-col>   

                                <el-col :span="12">   
                            <el-form-item label="所属区域" prop="category_id">
                              <el-select v-model="ruleForm.category_id" placeholder="请选择所属区域">
                                    <el-option v-for="(cate,index) in categorylist" :key="index" :label="cate.title" :value="cate.category_id">
                                            <span v-for="count in (cate.class_layer-1)">&nbsp;</span>
                                            <span v-if="cate.class_layer>1">|-</span>
                                            <span v-text="cate.title"></span>
                                    </el-option>
                              </el-select>
                            </el-form-item>
                        </el-col>  
                    
                        <el-col :span="12"> 
                                <el-col :span="9"> 
                                <el-form-item label="是否发布">
                                        <el-switch  on-text="是" off-text="否" v-model="ruleForm.status"></el-switch>
                                </el-form-item>
                            </el-col> 
                                <el-col :span="15"> 
                                <el-form-item label="推荐类型" prop="delivery">
                                        <el-switch on-text="轮播图" off-text="轮播图" :width="70" v-model="ruleForm.is_slide"></el-switch>
                                        <el-switch on-text="置顶" off-text="置顶" v-model="ruleForm.is_top"></el-switch>
                                        <el-switch on-text="推荐" off-text="推荐"  v-model="ruleForm.is_hot"></el-switch>
                                </el-form-item>
                            </el-col> 
                        </el-col>  

                        <el-col :span="24">  
                                <el-col :span="12" >
                            <el-form-item label="封面上传" >            
                        <el-upload 
                        class="upload-demo"
                        action="http://157.122.54.189:9095/admin/article/uploadimg"
                        :file-list="ruleForm.imgList"
                        :on-success="imgUploaded"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip"></div>
                      </el-upload>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                            <el-form-item label="图片相册" >   
                            <el-upload
                            class="upload-demo"
                            action="http://157.122.54.189:9095/admin/article/uploadfile" 
                            :file-list="ruleForm.fileList"
                            :on-success="fileUploaded"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip"></div>
                          </el-upload>
                        </el-form-item>
                        </el-col>
                    </el-col>
                    
                        <el-col :span="24">   
                         <el-col :span="6">
                                <el-form-item label="商品货号" prop="goods_no">
                                        <el-input v-model="ruleForm.goods_no"></el-input>
                                </el-form-item>
                            </el-col>   
                            <el-col :span="6">     
                                <el-form-item label="库存数量" prop="stock_quantity">
                                        <el-input v-model="ruleForm.stock_quantity"></el-input>
                                </el-form-item>
                            </el-col> 
                                <el-col :span="6">
                                <el-form-item label="市场价格" prop="market_price">
                                        <el-input v-model="ruleForm.market_price"></el-input>
                                </el-form-item>
                            </el-col>
                                <el-col :span="6">
                                <el-form-item label="销售价格" prop="sell_price">
                                        <el-input v-model="ruleForm.sell_price"></el-input>
                                </el-form-item>
                            </el-col>
                           
                        </el-col>   
               
                    <el-col :span="24"> 
                            <el-form-item label="内容摘要">
                              <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
                            </el-form-item>
                        </el-col>   

                        <el-col :span="24"> 
                                <el-form-item label="详细描述" >
                                    <quill-editor v-model="ruleForm.content"></quill-editor>
                                 </el-form-item>
                        </el-col>   
                        
                        <el-col :span="24"> 
                            <el-form-item>
                              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                              <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-col>   
                          </el-form>
                     

            </el-col>

        </el-row>
</div>
</template>

<script>
    import {
        quillEditor
    } from 'vue-quill-editor'
    export default {
        components: {
            quillEditor
        },
        data() {
            var checkNumber = (rule, value, callback) => {
                // 非空验证
                if (!value) {
                    return callback(new Error('不能为空'));
                }

                if (isNaN(value)) {
                    return callback(new Error('输入的值必须是一个数字'));
                } else {
                    callback();
                }
            };
            return {
                categorylist: [],
                ruleForm: {
                    title: '',
                    sub_title: '',
                    category_id: '',
                    status: false,
                    is_slide: true,
                    is_top: false,
                    is_hot: false,
                    goods_no: '',
                    stock_quantity: 0,
                    market_price: 0,
                    sell_price: 0,
                    content: '',
                    zhaiyao: '',
                    imgList: [], // 商品封面图片数据对象
                    fileList: [] //商品相册图片数组
                },
                rules: {
                    title: [{
                        required: true,
                        message: '请输入标题名称',
                        trigger: 'blur'
                    }, {
                        min: 3,
                        max: 8,
                        message: '长度在 3 到 8 个字符',
                        trigger: 'blur'
                    }],
                    goods_no: [{
                        required: true,
                        message: '请输入商品编号',
                        trigger: 'blur'
                    }],
                    stock_quantity: [{
                        required: true,
                        validator: checkNumber,
                        trigger: 'blur'
                    }],
                    market_price: [{
                        required: true,
                        validator: checkNumber,
                        trigger: 'blur'
                    }],
                    sell_price: [{
                        required: true,
                        validator: checkNumber,
                        trigger: 'blur'
                    }]

                }
            };
        },
        created() {
            this.getCatelist();
        },
        methods: {
            fileUploaded(response, file, fileList) {
                this.ruleForm.fileList.push(response);
            },
            imgUploaded(response, file, fileList) {
                this.ruleForm.imgList = [response]; // 单张封面图片
            },
            getCatelist() {
                this.$http.get('/admin/category/getlist/goods')
                    .then(res => {
                        // 判断状态值
                        // 赋值
                        this.categorylist = res.data.message;
                    });
            },
            resetForm(formref) {
                this.$refs[formref].resetFields();
            },
            submitForm(formref) {
                // 验证当前表单元素是否符合规则
                this.$refs[formref].validate((valid) => {
                    // 如果表单的所有元素值均合法，valid则返回true
                    if (valid) {
                        // ajax提交数据进行新增操作
                        this.$http.post('/admin/goods/add/goods', this.form)
                            .then(res => {
                                if (res.data.status == 1) {
                                    this.$message.error(res.data.message);
                                    return;
                                }
                                this.$router.push({
                                    name: 'goodslist'
                                });
                            });
                        console.log(this.ruleForm);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style scoped>
    .martop {
        margin-top: 10px;
    }
</style>