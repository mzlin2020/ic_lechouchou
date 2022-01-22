import * as echarts from 'echarts'
export default function(el) {
  // 初始化
  const echartInstance = echarts.init(el)

  // 设置option
  const setOptions = options => {
    echartInstance.setOption(options)
  }

  // 使图表具备响应式
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions
  }
}