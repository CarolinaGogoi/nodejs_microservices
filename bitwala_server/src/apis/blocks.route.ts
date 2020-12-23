import { Application, Request, Response , NextFunction } from 'express';
import { GetBlockByHash, GetBlocks, GetMoreTransactions } from '../services/BlockService';
import { CacheBlockDetails, CacheBlocks } from './middlewares/cache.middleware';

export default  (app: Application) => {
    //Get Blocks by Has
    app.get('/block/:hash', CacheBlockDetails, GetBlockByHash);

    app.get('/transactions/:hash', GetMoreTransactions);

    //Get allBlocks
    app.get('/blocks', CacheBlocks, GetBlocks)

    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(200).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title> Bitwala API for Developers </title>
            </head>
            <body>
                <div>
                <center>
                    <h2>List of APIs</h2>
                    <h2>Get Blocks:</h2>
                    <code>curl --location --request GET 'http://localhost:4000/blocks/'</code>
                    <h2>Get Block details by Hash:</h2>
                    <code>curl --location --request GET 'http://localhost:4000/block/[block_hash]'
                    </code>
                    <h2>Get Block Transactions by Hash:</h2>
                    <code>curl --location --request GET 'http://localhost:4000/transactions/[block_hash]'
                    </code>
                    
                </center>
                </div>
            </body>
            </html>
        
        `)
    })

}

 