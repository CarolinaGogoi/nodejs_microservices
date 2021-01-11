import express from 'express';
import { PORT } from './config';
import "dotenv";
import expressApp from './services/ExpressApp';
import { connectRedis } from './services/CacheService';

const startServer = async () => {
    
    const app = express()
     
    //connect DB and Other Servers if exist
    const client = await connectRedis();
    
    //Create Express App using DI
    await expressApp(app, client);
    
    app.listen(PORT, () => {
        console.log(`Listening to the port ${PORT}`);
    })
}

startServer();
