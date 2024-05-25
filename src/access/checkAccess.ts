import Access_Enum from './accessEnum'
import { User } from '../utils/myType'

/* 检查当前用户是否具有某个权限
@param loginUser 当前登录用户
@param needAccess 需要的权限
@return 是否具有权限
*/

const checkAccess = (loginUser: User, needAccess: string) => {
  // 获取当前用户具有的权限（是否登录）
  const loginUserAccess = loginUser?.userRole ?? Access_Enum.NOT_LOGIN
  const accessNeed = needAccess ?? Access_Enum.NOT_LOGIN
  if (accessNeed === Access_Enum.NOT_LOGIN) {
    // 用户没登录就能有的权限
    return true
  } else if (
    // 如果用户登录才能有的权限
    accessNeed === Access_Enum.USER &&
    loginUserAccess !== Access_Enum.NOT_LOGIN
  ) {
    return true
  } else if (
    // 如果用户是管理员才能有的权限
    accessNeed === Access_Enum.ADMIN &&
    loginUserAccess === Access_Enum.ADMIN
  ) {
    return true
  } else {
    // 其余都是没有权限的情况
    return false
  }
}

export default checkAccess
