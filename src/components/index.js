// 改文件负责所有公共组件的全局注册
import PageTools from './pageTools'
import UploadExcel from './UploadExcel'

const components = [
  PageTools,
  UploadExcel
]

export default {
  install(Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
