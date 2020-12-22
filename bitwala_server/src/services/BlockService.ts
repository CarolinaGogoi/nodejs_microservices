import{ Request, Response, NextFunction } from 'express';
import { BlockDetails } from '../interfaces_dto';
import { Api, NotFoundError } from '../utils';

export const GetBlocks = async (req: Request, res: Response, next: NextFunction) => {
    
    const client = req.redis;

    try {
         const response = await Api.get('blocks?format=json')
        if(response){
            client.setex('latest_blocks',1800, JSON.stringify(response.data));
            res.status(200).json(response.data)
        }
    } catch (ex) {
        return next(new NotFoundError('Blocks data Not found'))
    }
}

export const GetBlockByHash = async(req: Request, res: Response, next: NextFunction) =>  {

    const blockHash = req.params.hash;
    const client = req.redis;

    if(blockHash){
        try {
            const response = await Api.get<BlockDetails>(`rawblock/${blockHash}`)
            if(response.data){
                
                const blockDetails = response.data;
 
                const { block_index, prev_block, size, tx  } = blockDetails;

                const firstPageTxn = tx.slice(0,10);
                
                client.setex(`${blockHash}`, 600, JSON.stringify({ block_index, prev_block, size, txnCount: tx.length || 0, tx: firstPageTxn}));
                client.setex(`${blockHash}-complete`, 600, JSON.stringify(blockDetails));

               res.status(200).json({block_index, prev_block, size, txCount: tx.length, tx: firstPageTxn})
           }
       } catch (ex) {
            return next(new NotFoundError('Blocks Details Not found'))
        }
    } 

}


// It can be a Live Call or we can return all transactions rom cache
export const GetMoreTransactions = async(req: Request, res: Response, next: NextFunction) =>  {

    const blockHash = req.params.hash;
    const client = req.redis;

    if(blockHash){
            
        client.get(`${blockHash}-complete`, async(err, data) => {
            if(data !== null){
                return res.status(200).json(JSON.parse(data));
            }else{
                try {
                    const response = await Api.get<BlockDetails>(`rawblock/${blockHash}`)
                    if(response.data){
                        client.setex(`${blockHash}-complete`, 600, JSON.stringify(response.data));
                        res.status(200).json(response.data)
                    }
                } catch (ex) {
                    return next(new NotFoundError('Blocks Details Not found'))
                }

            }
         })
 
    } 

}