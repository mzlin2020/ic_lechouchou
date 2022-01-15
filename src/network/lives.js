import { request } from './request'

// 关进黑屋
export const putInDarkRoom = (liveId, ifShow) => {
  request({
    url: "lives/ifShow",
    method: 'put',
    params: {
      liveId,
      ifShow
    }
  })
}