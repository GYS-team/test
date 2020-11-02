import configs from '../configs/configs'

import axios from 'axios'

export default axios.create({
  baseURL: configs.addr(),
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken'
})
