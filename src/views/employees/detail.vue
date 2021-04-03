<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <el-form ref="userForm" :model="userInfo" :rules="userRules" label-width="120px" style="margin-left: 120px; margin-top: 30px">
              <el-form-item label="姓名：" prop="username">
                <el-input v-model="userInfo.username" style="width: 300px;" />
              </el-form-item>
              <el-form-item label="新密码：" prop="password2">
                <el-input v-model="userInfo.password2" style="width: 300px;" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <component :is="userComponent" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <job-info />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info'
import JobInfo from './components/job-info'

export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      userComponent: 'UserInfo',
      userId: this.$route.params.id,
      userInfo: {
        username: '',
        password2: ''
      },
      userRules: {
        username: [
          { required: true, message: '姓名名不能为空', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度为6-9位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
    },
    async saveUser() {
      try {
        await this.$refs.userForm.validate()
        await saveUserDetailById({ ...this.userInfo, password: this.password2 })
        this.$message.success('保存成功')
      } catch (error) {
        console.log('🚀 ~ file: detail.vue ~ line 62 ~ saveUser ~ error', error)
      }
    }
  }
}
</script>

<style>

</style>
