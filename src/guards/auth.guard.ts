import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      return await this.jwtService.verify(token);
    } catch {
      return false;
    }
  }
}
