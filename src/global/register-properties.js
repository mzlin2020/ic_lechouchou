// 对格式化的函数进行全局注册
import { formatFansNum, formatUtcString} from '../utils/format'
export default function(app) {
  app.config.globalProperties.$filter = {
    // 粉丝数---xx万
    formatFansNum(value) {
      return formatFansNum(value)
    },
    // 客单价
    formatMedianPrice(value) {
      if(value === 0) {
        return value
      }
      return "￥" + value.toFixed(2)
    },
    // 对UCT时间进行格式化
    formatTime(value) {
      return formatUtcString(value)
    },

    // 对观众数量进行格式化
    formatVisitNum(value) {
      value = Number(value)
      if(value > 10000) {
        return (value/10000).toFixed(2) + "万"
      }
      
    },
    // 对直播的销售金额格式化
    formatTotalAmount(value) {
      value = Number(value)
      if(value > 10000) {
        return (value/10000).toFixed(2) + "万"
      }
      return value
    }
  }
}