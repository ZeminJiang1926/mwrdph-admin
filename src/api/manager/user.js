import request from '@/plugin/axios'
export function getUser (query) {
  return request({
    url: '/user',
    method: 'get',
    loading: {
      type: 'nprogress',
      interval: 500
    },
    params: query
  })
}
export function queryUser (query) {
  return request({
    url: '/user/query',
    method: 'get',
    loading: {
      type: 'nprogress',
      interval: 500
    },
    params: query
  })
}
export function addUser (data) {
  return request({
    url: '/user/add',
    method: 'post',
    data: data,
    success: {
      type: 'message',
      options: {
        message: '保存成功',
        type: 'success'
      }
    }
  })
}
export function delUser (id) {
  return request({
    url: '/user/del/' + '' + id,
    method: 'get',
    // params: { id: id },
    success: {
      type: 'message',
      options: {
        message: '删除成功',
        type: 'success'
      }
    }
  })
}
export function delUsers (ids) {
  return request({
    url: '/user/dels',
    method: 'post',
    data: ids,
    // params: { id: id },
    success: {
      type: 'message',
      options: {
        message: '删除成功',
        type: 'success'
      }
    }
  })
}
export function updateUser (data) {
  return request({
    url: '/user/update',
    method: 'post',
    data: data
  })
}
