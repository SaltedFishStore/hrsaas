// 改文件负责所有公共组件的全局注册
import PageTools from './pageTools'

const components = [
  PageTools
]

export default {
  install(Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
