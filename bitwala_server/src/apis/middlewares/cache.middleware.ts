
import { Request, Response, NextFunction } from 'express';

export const CacheBlocks = async(req: Request, res: Response, next: NextFunction) => {
    
    const client = req.redis;

    client.get('latest_blocks', (err, data) => {
        if(data !== null){
            return res.status(200).json(JSON.parse(data));
        }
        next();
    })

}

export const CacheBlockDetails = async(req: Request, res: Response, next: NextFunction) => {

    const blockHash = req.params.hash;

    const client = req.redis;

    client.get(blockHash, (err, data) => {
        if(data !== null){
            return res.status(200).json(JSON.parse(data));
        }
        next();
    })

}

