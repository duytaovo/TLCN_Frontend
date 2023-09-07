import http from 'src/utils/http'

const authApi = {
  login(data: any) {
    return http.post('/auth/login', data)
  }
}

export default authApi
