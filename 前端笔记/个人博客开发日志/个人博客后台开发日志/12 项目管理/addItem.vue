<template>
  <div class="add-item-container">
    <div class="block">项目名称（必填）</div>
    <el-input v-model="form.title" placeholder="请输入项目标题"></el-input>
    <div class="block">项目描述（必填）</div>
    <el-input
      v-model="form.description"
      placeholder="请输入项目描述"
    ></el-input>
    <div class="block">项目链接（必填）</div>
    <el-input v-model="form.url" placeholder="请输入项目链接"></el-input>
    <div class="block">github地址（必填）</div>
    <el-input v-model="form.github" placeholder="请输入github地址"></el-input>
    <Upload uploadTitle="项目预览图" v-model="form.thumb" />
    <div class="block">请选择项目等级</div>
    <el-select
      v-model="form.order"
      slot="prepend"
      placeholder="请选择项目等级"
      @change="change"
      style="width: 200px"
    >
      <el-option label="1" value="1"> </el-option>
      <el-option label="2" value="2"> </el-option>
      <el-option label="3" value="3"> </el-option>
      <el-option label="4" value="4"> </el-option>
    </el-select>
    <div class="block">
      <el-button
        style="margin-top: 15px"
        type="primary"
        @click="addProjectItemHandle"
        >添加项目</el-button
      >
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload.js";
import { addProject } from "@/api/project.js";
export default {
  components: {
    Upload,
  },
  data() {
    return {
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
  methods: {
    change() {
      this.$forceUpdate();
    },
    addProjectItemHandle() {
      let obj = { ...this.form };
      obj.description = this.form.description.split(",");
      obj.order = parseInt(this.form.id);
      addProject(obj).then(() => {
        this.$router.push("/projectlist");
        this.$message.success("成功添加项目");
      });
    },
  },
};
</script>

<style>
.add-item-container {
  padding: 0 25px;
}
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>
