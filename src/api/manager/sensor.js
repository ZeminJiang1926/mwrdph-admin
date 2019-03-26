import request from '@/plugin/axios'
export function getDetector (query) {
  return request({
    url: '/detector',
    method: 'get',
    loading: {
      type: 'nprogress',
      interval: 500
    },
    params: query
  })
}
export function getDetectorByItems (query) {
  return request({
    url: '/detector/query',
    method: 'get',
    loading: {
      type: 'nprogress',
      interval: 500
    },
    params: query
  })
}
export function addDetector (data) {
  return request({
    url: '/detector/add',
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
export function delDetector (id) {
  return request({
    url: '/detector/del/' + '' + id,
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
export function delDetectors (ids) {
  return request({
    url: '/detector/dels',
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
export function updateDetector (data) {
  return request({
    url: '/detector/update',
    method: 'post',
    data: data
  })
}
