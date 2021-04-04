<template>
  <el-dialog :title="`${showText}权限点`" :visible="showDialog" @colse="btnCancel">
    <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formData.name" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="权限描述" prop="description">
        <el-input v-model="formData.description" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="开启" prop="enVisible">
        <el-switch
          v-model="formData.enVisible"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnConfirm">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getPermissionDetail, updatePermission, addPermission } from '@/api/permisson'

export default {
  props: {
    showDialog: Boolean,
    param: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: 0 // 开关
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑' : '新增'
    }
  },
  methods: {
    async getPermissionDetail(id) {
      this.formData = await getPermissionDetail(id)
    },
    btnCancel() {
      this.formData = {}
      this.$refs.perForm.resetFields() // 重置校验规则
      this.$emit('update:showDialog', false)
    },
    async btnConfirm() {
      this.$refs.perForm.validate(async(valid) => {
        if (valid) {
          if (this.formData.id) {
            // 编辑
            await updatePermission(this.formData)
            this.$message.success('更新成功')
            this.$parent.getPermissionList() // 调用父组件方法更新数据
            this.$emit('update:showDialog', false) // 关闭弹层
          } else {
            // 新增
            await addPermission({ ...this.formData, ...this.param })
            this.$message.success('新增成功')
            this.$parent.getPermissionList() // 调用父组件方法更新数据
            this.$emit('update:showDialog', false) // 关闭弹层
          }
        }
      })
    }
  }
}
</script>

<style>

</style>
