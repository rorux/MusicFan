import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { I18nContext } from 'nestjs-i18n';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokensService: TokensService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const i18n = I18nContext.current();
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;
    const publicUser = this.tokensService.decodeAuthHeader(authHeader, i18n);
    req.user = publicUser;

    return true;
  }
}
