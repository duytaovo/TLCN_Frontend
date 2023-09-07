import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_SHARE_A_CAR = '/'
const URL_ADD_TEXT = '/pageElement/updateTextElement'
const URL_ADD_IMAGE = '/pageElement/updateImageElement'
const shareACarApi = {
  getShareACar() {
    return http.get<SuccessResponse<any>>(URL_SHARE_A_CAR, {})
  },

  updateText(data: any) {
    return http.put(`${URL_ADD_TEXT}`, data)
  },

  uploadImage(body: FormData) {
    return http.put<SuccessResponse<string>>(URL_ADD_IMAGE, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default shareACarApi
