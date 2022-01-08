import registerElement from './register-element'
import propertirs from './register-properties'
export function registerApp(app){
  registerElement(app) // element-plus注册
  propertirs(app) //注册全局格式化的函数
}