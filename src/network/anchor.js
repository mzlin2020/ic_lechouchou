import { request } from './request'

// 获取黑屋信息列表
export const getDarkRoomAnchorsInfo = async () => {
  const res = await request({
    url:"anchors/darkroom"
  })
  return res
}


// 关进黑屋
export const putInDarkRoom = (anchorId, ifShow) => {
  request({
    url: "anchors/ifShow",
    method: 'put',
    params: {
      anchorId,
      ifShow
    }
  })
}

