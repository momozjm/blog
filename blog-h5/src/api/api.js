import { axios } from '@/utils/request'

// const api = {
//   // 获取详情
//   detail: '/detail'
// }

export function getMessageApi(params) {
  return axios({
    url: '/getMessage',
    method: 'get',
    params: {
      ...params
    }
  })
}

export function handleLoginApi(params) {
  return axios({
    url: '/login',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function handleSearchApi(params) {
  return axios({
    url: '/search',
    method: 'get',
    params: {
      ...params
    }
  })
}
