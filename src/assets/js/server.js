/**
 * 服务模块封装
 * Created
 */
import axios from 'axios'
import _ from 'lodash'
// 生产环境地址
let _beta = ''
// 测试接口地址
let _origin = window.location.origin
console.log('_origin:',_origin)
console.log('VUE_APP_SERVER:',process.env.VUE_APP_SERVER)
const mainUrl = process.env.VUE_APP_SERVER === 'prod' ? _beta : _origin
// 'Content-Type': 'application/x-www-form-urlencoded' multipart/form-data text/plain
const contentType = 'application/json; charset=utf-8'
let options = {
  timeout: 10000,
  // responseType: 'json', // 返回数据类型
  // withCredentials: false, // 表明是否有跨域请求
  headers: {
    post: {
      'Content-Type': contentType
    },
    get: {
      'Content-Type': contentType
    },
    put: {
      'Content-Type': contentType
    }
  },
  baseURL: mainUrl // 服务器接口地址
}
axios.defaults.headers['Content-Type'] = contentType

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

// 创建服务
let createService = () => {
  let service = axios.create(options)
  // 拦截器
  service.interceptors.request.use(config => {
    config.data = config.data || {}
    config.headers['Accept'] = 'application/json'
    // config.headers['X-Requested-With'] = 'XMLHttpRequest'
    try {
      const token = config.data['ACCESS_TOKEN'] || config['ACCESS_TOKEN'] || ''
      const CodeKey = config.data['CODE_KEY'] || config['CODE_KEY'] || ''
      if (CodeKey) {
        config.headers['CODE_KEY'] = CodeKey
      }
      if (token) {
        config.headers['ACCESS-TOKEN'] = token
      }
      if (CodeKey || token) {
        let newParam = {}
        _.each(config.data, (value, key) => {
          // console.log(key + '--' + value)
          if (key !== 'ACCESS_TOKEN' && key !== 'CODE_KEY') {
            newParam[key + ''] = value
          }
        })
        config.data = newParam
      }
    } catch (er) {
      // console.log(er)
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

  service.interceptors.response.use(response => {
    // eslint-disable-next-line no-unused-vars
    const codekey = response.headers['codekey'] || ''
    const [data, status] = [response.data, response.status]
    // console.log('response:>', response)
    if (Object.prototype.toString.call(data) === '[object String]' && status <= 200 && status < 300) {
      return {
        success: true,
        msg: '',
        statusCode: status,
        code: '0',
        codeKey: codekey,
        data: data
      }
    } else {
      return {
        success: data.code === '0',
        msg: data.msg || codeMessage[status] || '未知错误',
        statusCode: status,
        codeKey: codekey,
        ...data
      }
    }
  }, error => {
    // console.log('error', error)
    if (error && error.response) {
      const status = error.response.status || ''
      error['message'] = codeMessage[status] || ''
      // return Promise.reject(error) // 抛出异常！
    }
    return error
  })

  return service
}

// axios get
// eslint-disable-next-line no-unused-vars
function axiosGet(url, param = '') {
  console.log('axiosGet:',url)
  if (param !== '') {
    let newParam = ''
    _.each(param, (value, key) => {
      if (key !== 'ACCESS_TOKEN' && key !== 'CODE_KEY') {
        if (newParam === '') {
          newParam = '?' + key + '=' + value
        } else {
          newParam += '&' + key + '=' + value
        }
      }
    })
    url = url + newParam
  }
  return RequestAxios.get(url, param).then((res) => {
    return res
  }, (err) => {
    return err
  }).catch((err) => {
    console.log('catch err:>', err)
  })
}

// 逐个导出
export const RequestAxios = createService()
export const RequestGet = axiosGet
export const baseUrl = mainUrl
