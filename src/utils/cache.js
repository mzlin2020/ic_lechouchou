class LocalCache {
  // 设置本地缓存
  setCache(key, value) {
    window.localStorage.setItem(key,JSON.stringify(value)) 
  }

  // 获取缓存
  getCache(key) {
    const value = window.localStorage.getItem(key)
    if(value) {
      return JSON.parse(value)
    }
  }

  // 删除缓存
  deleteCache(key) {
    window.localStorage.removeItem(key)
  }

  // 清除缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()