import request from '@/utils/request'

/**
 *  获取文章详情
 * @param {Number,String} article_id  文章id
 * @returns promeis
 */
export const getAarticilesAPI = (article_id) => {
  return request({
    url: `/v1_0/articles/${article_id}`
  })
}

/**
 * 关注用户
 * @param {string} target 文章作者信息
 * @returns promeis
 */
export const upfollowingsAPI = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

/**
 * 取消关注
 * @param {Number,string} target  取关用户的id
 * @returns promeis
 */
export const CancelTheAttentionAPI = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

/**
 * 收藏文章
 * @param {*} target id
 * @returns promeis
 */
export const collectionsAPI = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

/**
 * 取消收藏
 * @param {*} target id
 * @returns promies
 */
export const cancelColleCtionsAPI = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

/**
 *  获取文章或评论的回复
 * @param {a/c} type  a:获取文章回复 c: 获取评论的恢复
 * @param {string/Number} source 文章或评论的id
 * @returns promies
 */
export const getCommentsAPI = (type, source, offset) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset
    }
  })
}

/**
 * 获取评论的回复
 * @param {string/Number} target 文章id及对文章评论，评论id及为评论id
 * @param {string} content  评论内容
 * @param {string/Number} art_id 文章id，对文章评论不需要传
 * @returns
 */
export const ToSendCommentsAPI = (target, content, art_id) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id
    }
  })
}
