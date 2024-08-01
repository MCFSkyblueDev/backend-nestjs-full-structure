import { Injectable, NestMiddleware } from '@nestjs/common';
import * as cors from 'cors';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    cors({
      origin: '*',
      methods: 'GET,POST,PUT,DELETE,PATCH',
      allowedHeaders: 'Content-Type, Authorization',
    });
    next();
  }
}