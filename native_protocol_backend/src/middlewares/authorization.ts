import { NextFunction, Request, Response } from 'express';

export interface Authorizer {
  isAuthorized: (req: Request) => Promise<boolean>;
}

export function authorization(authorizer: Authorizer) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (await authorizer.isAuthorized(req)) {
      next();
    } else {
      res.status(401).json({
        message: 'Unauthorized',
      });
    }
  };
}
