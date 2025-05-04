import { NextFunction, Request, Response } from 'express';

export interface Authorizer {
  isAuthorized: (req: Request) => boolean;
}

export function authorization(authorizer: Authorizer) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (authorizer.isAuthorized(req)) {
      next();
    } else {
      res.status(401).json({
        message: 'Unauthorized',
      });
    }
  };
}
