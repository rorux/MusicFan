import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { I18nContext } from 'nestjs-i18n';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private tokenService: TokensService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const i18n = I18nContext.current();
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException(i18n.t('errors.unauthorized'));
      }

      const accessToken = authHeader.split(' ')[1];
      if (!accessToken) {
        throw new UnauthorizedException(i18n.t('errors.unauthorized'));
      }

      const userData = this.tokenService.validateAccessToken(accessToken);
      if (!userData) {
        throw new UnauthorizedException(i18n.t('errors.unauthorized'));
      }

      req.user = userData;

      return true;
    } catch (error) {
      throw new UnauthorizedException(i18n.t('errors.unauthorized'));
    }
  }
}
