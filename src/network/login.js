import axios from "axios";

export default function loginAccount(account) {
  return axios({
    url: 'api/admin_user/login/',
    method: 'POST',
    data: account
  })
}

