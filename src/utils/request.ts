import axios, { AxiosRequestConfig } from 'axios'
// import Cookies from 'js-cookie'

function request(options: AxiosRequestConfig) {
  return axios({
    ...options,
    headers: {
      'x-csrf-token': 'ObBFb_SPkYh21peXVKy-CN4A',
    },
  })
}

export default request

// if (axiosOptions.method === 'get') {
//     opts = {
//       params,
//       paramsSerializer: params => qs.stringify(params, { indices: false }),
//     };
//   } else {
//     const { url } = axiosOptions;
//     const formatUrl = isEmpty(params) ? url : `${url}${includes(url, '?') ? '&' : '?'}${qs.stringify(params)}`;
//     const formatData = includes(currentContentType, 'application/json') ? JSON.stringify(data) : qs.stringify(data);
//     opts = { data: formatData, url: formatUrl };
//   }
