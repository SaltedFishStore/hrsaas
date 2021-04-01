<template>
  <el-dialog title="新增部门" :visible="showDialog">
    <!-- label-width设置label宽度 -->
    <el-form label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="1-50个字符" style="width: 80%" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="1-50个字符" style="width: 80%" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" placeholder="请选择" style="width: 80%" @focus="getEmployeesSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" type="textarea" :rows="3" placeholder="1-300个字符" style="width: 80%" />
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
import { getDepartments } from '@/api/departments'
import { getEmployeesSimple } from '@/api/employees'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 校验同级部门下是否有重复部门
    const checkNameRepeat = async(rule, value, callback) => {
      // 获取所用部门数据
      const { depts } = await getDepartments()
      // 找当前部门下的所用子部门
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }

    // 校验部门编码不能重复
    const checkCodeRepeat = async(rule, value, callback) => {
      // 获取所用部门数据
      const { depts } = await getDepartments()
      const isRepeat = depts.some(item => item.code === value && value)
      isRepeat ? callback(new Error(`同级部门下已经有${value}的部门编码了`)) : callback()
    }
    return {
      // 表单数据
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      // 校验规则
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', triger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', triger: 'blur' },
          { validator: checkNameRepeat, triger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', triger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', triger: 'blur' },
          { validator: checkCodeRepeat, triger: 'blur' }
        ],
        manager: [{ required: true, message: '部门负责人不能为空', triger: 'blur' }],
        introduce: [
          { required: true, message: '部门介绍不能为空', triger: 'blur' },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', triger: 'blur' }
        ]
      },
      peoples: [] // 接受获取员工简单数据列表
    }
  },
  methods: {
    // 获取员工简单数据
    async getEmployeesSimple() {
      this.peoples = await getEmployeesSimple()
    }
  }
}
</script>

<style>

</style>
