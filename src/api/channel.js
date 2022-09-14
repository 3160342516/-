import request from '@/utils/request'

export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

export const getAllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 *删除频道
 * @param {string|Number} id
 * @returns promise
 */
export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

/**
 *添加频道
 * @param {Number|string} id 频道id
 * @param {Number} seq  新增频道添加的索引下标
 * @returns promise
 */
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels/',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
