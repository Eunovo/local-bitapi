import { Request, Response, NextFunction } from 'express';

const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log request information
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // Call next middleware/route handler
  next();

  // Log response information
  console.log(`[${new Date().toISOString()}] ${res.statusCode} ${res.statusMessage}`);
};

const errorLoggerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error information
  console.error(`[${new Date().toISOString()}] ${err.name}: ${err.message}`);
  console.error(err.stack);

  // Call next middleware/route handler
  next(err);
};

export { requestLoggerMiddleware, errorLoggerMiddleware };
