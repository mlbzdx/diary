<template>
  <div class="project-list-container">
    <!-- 项目列表 -->
    <el-table
      v-loading="isLoading"
      :data="tableData"
      border
      element-loading-text="loading"
      highligth-current-row
      fit
    >
      <el-table-column align="center" width="60"
        ><template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="项目名称" width="150">
        <template slot-scope="scope"
          ><a :href="scope.row.url" class="itemHref">{{
            scope.row.name
          }}</a></template
        >
      </el-table-column>
      <el-table-column label="项目描述">
        <template slot-scope="scope">{{
          scope.row.description.toString()
        }}</template>
      </el-table-column>
      <el-table-column label="预览图" width="150">
        <template slot-scope="scope">
          <el-image
            style="width: 120px"
            :src="scope.row.absThumb"
            fit="contain"
            :preview-src-list="srcList"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="200" align="center">
        <!-- github -->
        <el-tooltip
          class="item"
          effect="dark"
          content="Github"
          placement="top"
          :hide-after="2000"
        >
          <el-button
            type="primary"
            icon="iconfont icon-github"
            circle
            @click="openGithubHandle(scope.row)"
          ></el-button>
        </el-tooltip>
        <!-- 编辑 -->
        <el-tooltip
          class="item"
          effect="dark"
          content="编辑"
          placement="top"
          :hide-after="2000"
        >
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            @click="editProjectHandle(scope.row)"
          ></el-button>
        </el-tooltip>
        <!-- 删除 -->
        <el-tooltip
          class="item"
          effect="dark"
          content="删除"
          placement="top"
          :hide-after="2000"
        >
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click="delProjectHandle(scope.row)"
          ></el-button>
        </el-tooltip>
      </el-table-column>
    </el-table>
    <!-- 编辑对话框 -->
    <el-dialog title="请编辑项目信息" :visible.sync="dialogVisible" fullscreen>
      <el-form ref="form" :model="form.name" label-width="80px" size="mini">
        <el-form-item label="项目名称">
          <el-input v-model="sizeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="项目描述(每条描述请用英文,隔开)">
          <el-input
            v-model="form.description"
            placeholder="请输入项目描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目链接">
          <el-input v-model="form.url" placeholder="请输入项目链接"></el-input>
        </el-form-item>
        <el-form-item label="项目github地址">
          <el-input
            v-model="form.github"
            placeholder="请输入github地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目预览图">
          <Upload uploadTitle="项目预览图" v-model="form.thumb" />
        </el-form-item>
        <el-form-item label="请选择项目级别">
          <el-select
            v-model="form.order"
            slot="prepend"
            placeholder="请选择项目级别"
            @change="change"
            style="width: 200px"
          >
            <el-option label="1" value="1"> </el-option>
            <el-option label="2" value="2"> </el-option>
            <el-option label="3" value="3"> </el-option>
            <el-option label="4" value="4"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目github地址">
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmEditProjectHandle"
              >确 定</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Upload from "@/components/Upload.js";
import { BaseConfig } from "@/BaseConfig.js";
import { getProject, delProject, editProject } from "@/api/project.js";
export default {
  data() {
    return {
      tableData: [],
      isLoading: false,
      srcList: [],
      dialogVisible: fasle,
      form: {
        description: [],
        name: "",
        url: "",
        github: "",
        thumb: "",
        order: 0,
        id: "",
      },
    };
  },
  components: {
    Upload,
  },
  methods: {
    openGithubHandle(data) {
      window.open(data.github);
    },
    editProjectHandle(data) {
      this.dialogVisible = true;
      this.form = { ...data, description: data.description.toString() };
    },
    delProjectHandle({ id }) {
      this.$confirm("确定要删除此项目吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delProject(id).then(() => {
            this.initData();
            this.$message.success("成功删除项目");
          });
        })
        .catch(() => {
          this.$message.warning("取消删除项目");
        });
    },
    initData() {
      this.isLoading = true;
      getProject().then(({ data }) => {
        this.tableData = [...data];
        for (const item of this.tableData) {
          item.absThumb = BaseConfig + item.thumb;
          this.srcList.push(item.absThumb);
        }
        this.isLoading = false;
      });
    },
    change() {
      this.$forceUpdate();
    },
    confirmEditProjectHandle() {
      let obj = { ...this.form };
      obj.description = this.form.description.split(",");
      obj.order = parseInt(this.form.id);
      editProject(obj.id, obj).then(() => {
        this.dialogVisible = false;
        this.initData();
        this.$message.success("成功修改项目");
      });
    },
  },
  created() {
    this.initData();
  },
};
</script>

<style>
.itemHref:hover {
  color: rgb(163, 163, 163);
}
</style>
