// 自定义指令

export const imageerror = {
  inserted(dom, options) {
    // 图片异常的逻辑
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
