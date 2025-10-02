export const REQUEST_USER_KEY = 'user'
export const AUTH_TYPE_KEY = 'authType'
export const AuthType = {
  Bearer: 'Bearer',
  None: 'None',
} as const

export const UserRole = {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
} as const

export type AuthTypeType = (typeof AuthType)[keyof typeof AuthType]
