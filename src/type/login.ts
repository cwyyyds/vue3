export interface loginFromInt {
  username: string
  password: string
  isShowEye: boolean
  code: number | string
}
export class loginData {
  login: loginFromInt = {
    username: '',
    password: '',
    isShowEye: false,
    code: '',
  }
}
