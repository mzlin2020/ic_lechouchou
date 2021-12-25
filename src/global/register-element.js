// 导入样式
import 'element-plus/theme-chalk/index.css'
import {
  ElAside,
  ElButton,
  ElCard,
  ElCheckbox,
  ElContainer,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElCol,
  ElRow,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElImage,
} from 'element-plus'

const conponents = [
  ElButton,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElIcon,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElCol,
  ElRow,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElImage
]

export default function(app) {
  for(const conponent of conponents) {
    app.component(conponent.name, conponent)
  }
}