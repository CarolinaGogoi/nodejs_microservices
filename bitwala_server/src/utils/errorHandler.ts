import { Request, Response, NextFunction } from 'express';

export abstract class AppError extends Error {
    abstract statusCode: number;
  
    constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, AppError.prototype);
    }
    abstract serializeErrors(): { message: string; fields?: string }[];
  }
  
  
  export class NotFoundError extends AppError {
    statusCode = 404;
  
    constructor(message: string) {
      super(message);
  
      Object.setPrototypeOf(this, NotFoundError.prototype);
    }
  
    serializeErrors() {
      return [{ message: this.message }];
    }
  }
   
  
  export class BadRequestError extends AppError {
    statusCode = 400;
  
    constructor(message: string) {
      super(message);
  
      Object.setPrototypeOf(this, NotFoundError.prototype);
    }
  
    serializeErrors() {
      return [{ message: this.message }];
    }
  }
  

export const HandleErrors = (
  error: Error,
  req: Request,
  res: Response,
) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ errors: error.serializeErrors() });
  }

  return res
    .status(400)
    .json({ errors: [{ message: 'Bad request! Something went wrong' }] });
};
