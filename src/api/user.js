import request from '@/utils/request'

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 发送验证码
 * @param {string} mobile 手机号
 * @returns Promise
 */
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户信息
 * @returns promise
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
  })
}

/**
 * 上传图片
 * @param {*} file 裁剪过后的图片的file对象
 * @returns
 */
export const uploadPhoto = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

/**
 * 获取用户个人信息
 * @returns promise
 */
export const getPersonageNformation = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

/**
 * 修改个人信息
 * @param {object} data
 * @returns  promise
 */
export const upPersonageNformation = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
