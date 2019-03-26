import request from '@/plugin/axios'
export function getSection (query) {
  return request({
    url: '/section',
    method: 'get',
    loading: {
      type: 'nprogress',
      interval: 500
    },
    params: query
  })
}
export function getSectionByItems (query) {
  return request({
    url: '/section/query',
    method: 'get',
    loading: {
      type: 'nprogress',
      interval: 500
    },
    params: query
  })
}
export function addSection (data) {
  return request({
    url: '/section/add',
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
export function delSection (id) {
  return request({
    url: '/section/del/' + '' + id,
    method: 'get',
    params: { id: id },
    success: {
      type: 'message',
      options: {
        message: '删除成功',
        type: 'success'
      }
    }
  })
}
export function delSections (ids) {
  return request({
    url: '/section/dels',
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
export function updateSection (data) {
  return request({
    url: '/section/update',
    method: 'post',
    data: data
  })
}
