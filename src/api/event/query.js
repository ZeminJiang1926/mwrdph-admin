import request from '@/plugin/axios'
export function getIncident (query) {
  return request({
    url: '/incident',
    method: 'get',
    loading: {
      type: 'nprogress',
      interval: 500
    },
    params: query
  })
}
export function getIncidentUnChecked (query) {
  return request({
    url: '/incident/unChecked',
    method: 'get',
    loading: {
      type: 'nprogress',
      interval: 500
    },
    params: query
  })
}
export function getIncidentByitems (query) {
  return request({
    url: '/incident/range',
    method: 'get',
    loading: {
      type: 'nprogress',
      interval: 500
    },
    params: query
  })
}
