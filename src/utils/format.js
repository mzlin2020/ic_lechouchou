// 格式化

// 1.对粉丝数进行格式化
export function formatFansNum(value) {
  return (value/10000).toFixed(2) + "万"
}