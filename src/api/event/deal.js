import request from '@/plugin/axios'
export function getRole(id) {
    return request({
        url: '/role/' + id,
        method: 'get',
        loading: {
            type: 'nprogress',
            interval: 500
        }
    })
}