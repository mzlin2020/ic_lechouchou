// 格式化
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

// 1.对粉丝数进行格式化
export function formatFansNum(value) {
  return (value / 10000).toFixed(2) + "万";
}

// 2.对utc时间进行格式化
dayjs.extend(utc);
export function formatUtcString(utcString, format) {
  format = "YYYY-MM-DD HH:mm:ss";
  return dayjs.utc(utcString).format(format);
}
