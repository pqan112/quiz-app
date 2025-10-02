import { SetMetadata } from '@nestjs/common'
import { AUTH_TYPE_KEY, AuthType, AuthTypeType } from '../constants/auth.constant'
export type AuthTypeDecoratorPayload = { authType: AuthTypeType }

export const Auth = (authType: AuthTypeType) => {
  return SetMetadata(AUTH_TYPE_KEY, { authType })
}

export const IsPublic = () => Auth(AuthType.None)
