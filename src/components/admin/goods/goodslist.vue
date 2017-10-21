<template>
    <div class="arttmpl">
                <el-row>
            <el-col :span="24">
                <div class="abread bt-line">
                    <!-- 使用elementUI中的面包屑导航组件完成 -->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
        </el-row>

         <div class="operation">
            <el-row>
                <el-col :span="5">
                    <!-- 新增，删除，全选按钮 -->
                    <el-button>全选</el-button>
                    <el-button>新增</el-button>
                    <el-button>删除</el-button>
                </el-col>
                <el-col :span="6" :offset="13">
                    <!-- 搜索框 -->
                    <el-input placeholder="请输入搜索条件" icon="search" v-model="searchValue" :on-icon-click="getlist">
                    </el-input>
                </el-col>
            </el-row>
        </div>

        <el-row>
            <el-col :span="24">
                <el-table :data="list" max-height="400" style="width: 100%" :row-class-name="tableRowClassName" @selection-change="getrows">
                    <el-table-column type="selection" width="80">
                    </el-table-column>
                    <el-table-column prop="title" label="标题1">
                        <template scope="scope">
                            <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">
                                {{scope.row.title}}
                            </router-link>
                        </template>
</el-table-column>
<el-table-column prop="categoryname" label="类别" width="100">
</el-table-column>
<el-table-column label="发布人/发布时间" width="180">
    <template scope="scope">
                            {{scope.row.user_name }}  / {{scope.row.add_time | datafmt('YYYY-MM-DD')}}
                        </template>
</el-table-column>
<el-table-column prop="name" label="属性" width="100">
    <template scope="scope">
            <el-tooltip  v-bind="{content:(scope.row.is_slide==1?'进入轮播图':'不去轮播图')}" placement="top">
                   <i v-bind="{class:'el-icon-picture ls '+ (scope.row.is_slide==1?'imgactive':'')}"></i>
            </el-tooltip>
            <el-tooltip  v-bind="{content:(scope.row.is_top==1?'置顶':'没置顶')}" placement="top">
            <i v-bind="{class:'el-icon-upload ls '+ (scope.row.is_top==1?'imgactive':'')}"></i>
            </el-tooltip>
            <el-tooltip  v-bind="{content:(scope.row.is_hot==1?'热门':'不热')}" placement="top">
            <i v-bind="{class:'el-icon-star-on ls '+ (scope.row.is_hot==1?'imgactive':'')}"></i>
            </el-tooltip>
  </template>

</el-table-column>
<el-table-column label="操作" width="80">
    <template scope="scope">
                            <a href="#">修改</a>
                        </template>
</el-table-column>
</el-table>
<el-col :span="6" :offset="6">
    <div class="block">
        <el-pagination @size-change="sizeChange" @current-change="changePage" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper " :total="total">
        </el-pagination>
    </div>
</el-col>
</el-col>
</el-row>

</div>
</template>

<script>
    export default {
        data() {
            return {
                ids: '',
                searchValue: '',
                list: [],
                currentPage: 1,
                pageSize: 10,
                total: 0
            }
        },
        created() {
            // 获取到列表数据
            this.getlist();
        },
        methods: {
            sizeChange(currentSize) {
                this.pageSize = currentSize;
                this.getlist();
            },
            changePage(pageindex) {
                this.currentPage = pageindex;
                this.getlist();
            },
            getrows(rows) {
                this.ids = '';
                let splitchar = ',';
                for (var i = 0; i < rows.length; i++) {
                    if (i == rows.length - 1) {
                        splitchar = " ";
                    }
                    this.ids += rows[i].id + splitchar;
                    console.log(this.ids);
                }
            },
            getlist() {
                // 1.0 获取url'
                var url = '/admin/goods/getlist?pageIndex=' + this.currentPage + '&pageSize=' + this.pageSize + '&searchvalue=' + this.searchValue;
                this.$http.get(url).then(res => {
                    // 判断服务器返回的状态status
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                        return;
                    }

                    // 正常逻辑的处理
                    this.list = res.data.message;
                    this.total = res.data.totalcount;
                });
            },
            tableRowClassName(row, index) {
                //    控制奇数和偶数行的颜色
                if (index % 2 == 0) {
                    return 'info-row';
                } else {
                    return 'positive-row';
                }
            }
        }
    }
</script>
<style scoped>

</style>