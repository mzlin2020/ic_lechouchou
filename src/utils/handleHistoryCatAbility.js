// 对服务器返回的历史记录信息进行处理，使符合echarts的配置要求
export const handleHistoryCatAbility = (allData, catName) => {
  if(!allData) return ""

  // 情况一：如果catName有值，说明只需要处理并返回单一情况下的品类数据
  if(catName) {
    const newAllDate = {
      name: catName,
      legend: [catName],
      xAxis: [], //x轴要显示的内容
      series: {
        name: catName,
        type: 'line',
        smooth: true,
        data: []
      }
    }
    for(let item of allData) {
      newAllDate.xAxis.push(item.computeUnitlDate.slice(0,7))
      newAllDate.series.data.push(item.catSaleAbility.toFixed(2))
    }

    return allData = newAllDate
  }



  // 情况二：默认对所有品类数据进行处理并返回
  const newAllDate = {
    legend: [],
    series: [],
    xAxis: []
  }

  // 有几个品类的商品数据
  let flag = allData[0].catName
  newAllDate.legend.push(flag)
  for(let item of allData) {
    if(item.catName !== flag) {
      flag = item.catName
      newAllDate.legend.push(flag)
    }
  }

  // series
  let seriesItem = {
    name: "",
    type: 'line',
    smooth: true,
    data: []
  }
  for(let catName of newAllDate.legend) {

    seriesItem.name = catName

    for(let item of allData) {
      if(catName === item.catName) {
        seriesItem.data.push(item.catSaleAbility.toFixed(2))
      }
    }
      newAllDate.series.push(seriesItem)
      // 置空
      seriesItem = {
        name: "",
        type: 'line',
        stack: 'Total',
        data: []
      }
  }
  
  // xAxis
  for(let item of allData) {
    let date = item.computeUnitlDate.slice(0,7)
    if(newAllDate.xAxis.indexOf(date) !== -1) {
      continue
    }
    newAllDate.xAxis.push(date)
  }

  return allData = newAllDate
}