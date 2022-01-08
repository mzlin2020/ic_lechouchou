import axios from "axios";
const API_BASE_URL = process.env.VUE_APP_BASE_URL

export default function loginAccount(account) {
  return axios({
    url: API_BASE_URL + 'admin_user/login',
    method: 'POST',
    data: account
  })
}

