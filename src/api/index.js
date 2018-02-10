import axios from 'axios'
import conf from '../config'

const api = axios.create({
  baseURL: conf.remoteURL
})
export default api
