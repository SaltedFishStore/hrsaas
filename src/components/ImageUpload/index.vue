<template>
  <div>
    <el-upload
      list-type="picture-card"
      action="#"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :http-request="upload"
      :limit="1"
      :class="{ disable: fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>

    <!-- 进度条 -->
    <el-progress v-if="showPercent" style="width: 180px;" :percentage="percent" />

    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgUrl" style="width: 100%;" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云sdk

const cos = new COS({
  SecretId: 'AKIDLWGrAFFk6ex41ofSSGoTra3RfBVZ6sYx', // 身份识别 ID
  SecretKey: 'KTRSnESTDtKTPSFyRhz1rQuAUa4RYInt' // 身份密钥
})

export default {
  name: 'ImageUpload',
  data() {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileUid: '',
      percent: 0,
      showPercent: false
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    changeFile(file, fileList) {
      this.fileList = [...fileList]
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif']
      // 检查文件类型
      if (!types.includes(file.type)) {
        this.$message.error('图片类型只能是PNG，JPG，GIF，NMP格式')
        return false
      }
      // 检查文件类型
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大写不能超过5M')
        return
      }
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    },
    upload({ file }) {
      if (file) {
        // 上传文件到腾讯云
        cos.putObject({
          Bucket: 'hrsaas-1305481281', // 桶名称
          Region: 'ap-guangzhou', // 地域名称
          StorageClass: 'STANDARD',
          Key: file.name, // 文件名
          Body: file, // 文件
          onProgress: (progressData) => {
            this.percent = progressData.percent * 100
          }
        }, (err, data) => {
          if (!err && data.statusCode === 200) {
            // 图片上传成功
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                // upload为true则表示图片上传成功
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 2000)
          }
        })
      }
    }
  }
}
</script>

<style>
.disable .el-upload--picture-card {
  display: none;
}
</style>
