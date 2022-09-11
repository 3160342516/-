import request from '@/utils/request'

/**
 * 获取文章
 * @param {String} id
 * @param {Number} timestamp //请求新的推荐，传当前时间戳，请求历史推荐，传指定的时间戳
 * @returns
 */
export const getArticle = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
