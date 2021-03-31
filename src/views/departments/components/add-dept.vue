<template>
  <el-dialog title="新增部门" :visible="showDialog">
    <!-- label-width设置label宽度 -->
    <el-form label-width="120px">
      <el-form-item style="width: 80%" label="部门名称">
        <el-input placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item style="width: 80%" label="部门编码">
        <el-input placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item style="width: 80%" label="部门负责人">
        <el-select placeholder="请选择" />
      </el-form-item>
      <el-form-item style="width: 80%" label="部门介绍">
        <el-input type="textarea" :rows="3" placeholder="1-300个字符" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有底部插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
