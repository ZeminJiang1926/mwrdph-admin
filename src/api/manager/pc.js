import request from '@/plugin/axios'
export function getPC (query) {
  return request({
    url: '/pc',
    method: 'get',
    loading: {
      type: 'nprogress',
      interval: 500
    },
    params: query
  })
}
export function getPCByItems (query) {
  return request({
    url: '/pc/query',
    method: 'get',
    params: query
  })
}
export function addPc (data) {
  return request({
    url: '/pc/add',
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
export function delPC (id) {
  return request({
    url: '/pc/del/' + '' + id,
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
export function delPcs (ids) {
  return request({
    url: '/pc/dels',
    method: 'post',
    data: ids,
    success: {
      type: 'message',
      options: {
        message: '删除成功',
        type: 'success'
      }
    }
  })
}
export function updatePc (data) {
  return request({
    url: '/pc/update',
    method: 'post',
    data: data
  })
}
