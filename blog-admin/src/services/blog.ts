import request from '@/utils/request';

export interface addBlogParamsType {
  type: string;
  name: string;
  url: string;
}

export async function addBlogApi(params: addBlogParamsType) {
  console.log(params)
  return request('/api/blog/add', {
    method: 'POST',
    data: params,
  });
}
