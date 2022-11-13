import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class CheckJwtMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    const jwt = req.headers.authorization;
    if (!jwt) {
      throw new HttpException('jwt in not found in Authorization header', 401);
    }
    req.query.jwt = jwt;
    next();
  }
}
