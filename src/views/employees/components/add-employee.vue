<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="employeeForm" :model="employeeForm" :rules="rulse" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="employeeForm.username" placeholder="请输入姓名" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="employeeForm.mobile" placeholder="请输入手机号" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="employeeForm.timeOfEntry" placeholder="请选择日期" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="employeeForm.formOfEmployment" placeholder="请选择聘用形式" style="width: 80%;">
          <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="employeeForm.workNumber" placeholder="请输入工号" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="employeeForm.departmentName"
          placeholder="请选择部门"
          style="width: 80%;"
          @focus="getDepartments"
        />
        <el-tree
          v-if="showTree"
          v-loading="loading"
          :data="treeData"
          :props="{ label: 'name' }"
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="employeeForm.correctionTime" placeholder="请选择日期" style="width: 80%;" />
      </el-form-item>
    </el-form>
    <!-- 底部按钮 -->
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnConfirm">提交</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addEmployee } from '@/api/employees'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'
import EmployeeEnum from '@/api/constant/employees'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      treeData: [], // 部门组织架构数据
      showTree: false, // 控制树显示隐藏
      loading: false, // loading 显示隐藏
      EmployeeEnum,
      employeeForm: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rulse: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getDepartments() {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments()
      this.treeData = transListToTreeData(depts, '')
      this.loading = false
    },
    selectNode(node) {
      this.employeeForm.departmentName = node.name
      this.showTree = false
    },
    async btnConfirm() {
      try {
        await this.$refs.employeeForm.validate()
        await addEmployee(this.employeeForm) // 新增
        this.$parent.getEmployeesList() // 调用父组件方法更新数据
        this.$parent.showDialog = false // 关闭弹层
      } catch (error) {
        console.log('🚀 ~ file: add-employee.vue ~ line 122 ~ btnConfirm ~ error', error)
      }
    },
    btnCancel() {
      this.employeeForm = { // 重置表单数据
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.employeeForm.resetFields() // 重置校验规则
      this.$emit('update:showDialog', false) // 关闭弹层
    }
  }
}
</script>

<style>

</style>
