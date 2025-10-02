import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AUTH_TYPE_KEY, AuthType } from '../constants/auth.constant'
import { AuthTypeDecoratorPayload } from '../decorators/auth.decorator'
import { AccessTokenGuard } from './access-token.guard'

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly authTypeGuardMap: Record<string, CanActivate>

  constructor(
    private readonly reflector: Reflector,
    private readonly acessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.acessTokenGuard,
      [AuthType.None]: { canActivate: () => true },
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypeValue = this.reflector.getAllAndOverride<AuthTypeDecoratorPayload>(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? {
      authType: AuthType.Bearer,
    }
    const guard = this.authTypeGuardMap[authTypeValue.authType]
    try {
      if (!(await guard.canActivate(context))) {
        throw new UnauthorizedException()
      }
      return true
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new UnauthorizedException()
    }
  }
}
