<template>
    <div class="comment-container">
        <!-- 评论表格 -->
        <el-table :data="data" border style="width: 100%">
            <el-table-column label="序号" width="60">
                <template slot-scope="scope">
                    {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
                </template>
            </el-table-column>
            <el-table-column label="头像" width="80">
                <template slot-scope="scope">
                    <el-image style="width: 60px;" :src="scope.row.avatar" fit="contain"></el-image></template>
            </el-table-column>
            <el-table-column prop="scope.row.nickname" label="昵称"> </el-table-column>
            <el-table-column prop="scope.row.content" label="评论文章"> </el-table-column>
            <el-table-column prop="scope.row.content" label="评论内容"> </el-table-column>
            <el-table-column label="评论日期">
                <template slot-scope="scope">
                    <span>{{ scope.row.formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                        <el-button type="danger" icon="el-icon-delete" circle size="mini"
                            @click="delCommentHandel(scope.row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination style="margin-top: 30px" background :page-size="pageSize" :page-sizes="[5, 10, 20]"
            layout="prev, pager, next, total, ->, sizes, jumper" :total="size" :current-page.sync="pageNum"
            @size-change="sizeChangeHandle" @current-change="currentChangeHandle" @prev-click="prevClickHandle"
            @next-click="nextClickHandle">
        </el-pagination>
    </div>
</template>

<script>
import { getComments, delComment } from "@/api/comment.js";
import { formatDate } from "@/utils/tool.js";
export default {
    data() {
        return {
            data: [],
            pageSize: 10,
            size: 0,
            currentPage: 1,
            pageNum: 5,
        }
    },
    methods: {
        initData() {
            getComments(currentPage).then((res) => {
                this.data = res.data.rows;
                this.size = res.data.total;
                for (let item of this.data) {
                    item.formatDate = formatDate(item.createDate());
                }
            })
        },
        sizeChangeHandle(pagesize) {
            this.pageSize = parseInt(pagesize);
            this.currentPage = 1;
            this.pageNum = 1;
            this.initData();
        },
        currentChangeHandle(page) {
            this.currentPage = parseInt(page);
            this.initData();
        },
        prevClickHandle() {
            this.currentPage - 1;
        },
        nextClickHandle() {
            this.currentPage + 1;
        },
        delCommentHandel() {
            this.$confirm('此操作将删除评论', '是否继续?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delComment({ id }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        }


    }
};
</script>

<style></style>