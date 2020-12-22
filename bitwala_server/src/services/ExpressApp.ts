import express,{ Application, Request, Response, NextFunction } from 'express';
import BlocksRoute from '../apis/blocks.route';
import Cors from 'cors';
import "dotenv";
import { RedisClient } from 'redis';
import { HandleErrors } from '../utils';

//Asign redis for global access through request
declare global {
    namespace Express {
        interface Request{
            redis?: RedisClient
        }
    }
}

export default async (app: Application, redis: RedisClient ) => {
  
    //use middlewares
    app.use(Cors())
    app.use(express.json());

    //pass redis connection to other services
    app.use((req: Request, res: Response,next: NextFunction) => {
        req.redis = redis;
        next();
    })

    //Block Routes
     BlocksRoute(app);

     //handle anonymous routes & errors
    app.use(HandleErrors)

    return app;
}

