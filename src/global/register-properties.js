// 对格式化的函数进行全局注册
import { formatFansNum } from '../utils/format'
export default function(app) {
  app.config.globalProperties.$filter = {
    // 粉丝数---xx万
    formatFansNum(value) {
      return formatFansNum(value)
    },
    formatMedianPrice(value) {
      if(value === 0) {
        return value
      }
      return "￥" + value.toFixed(2)
    }
  }
}