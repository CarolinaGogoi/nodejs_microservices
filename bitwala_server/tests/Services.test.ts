import { expect } from 'chai';
import express from 'express';
import supertest from 'supertest';
import BlocksRoute from '../src/apis/blocks.route';
import App from '../src/services/ExpressApp';
import { connectRedis } from '../src/services/CacheService';
 
describe('Blocks Services - ', () => { 

    const app = express();

    interface Block {
        hash: String;
    }

    let mockBlock: Block;

    before(async function(){
        App(app, await connectRedis())
        app.use(BlocksRoute);
    })
    
    it('Should Get Latest Blocks with status code: 200', function(done){
        supertest(app).get('/blocks')
        .expect("Content-Type","application/json; charset=utf-8")
        .expect(200, done);
    })

    it('Should Get Latest Blocks From Cache', function(done){
        supertest(app).get('/blocks')
        .expect("Content-Type","application/json; charset=utf-8")
        .end((err,res) => {
            if(err){
                return done(err)
            }
            mockBlock = (<[Block]>res.body.blocks)[0];
            // console.log(mockBlock)
            return done();
        })
    })

    it('Should Get Block Details with status code: 200', function(done){
        supertest(app).get(`/block/${mockBlock.hash}`)
        .expect("Content-Type","application/json; charset=utf-8")
        .expect(200, done);
    })
 
    it('Should throw - Blocks Details Not found status code: 404', function(done){
        supertest(app).get('/block/4385763434')
        .expect(404, done);
    })

    it('Should Get Block Details with 200 status code', function(done){
        supertest(app).get(`/block/${mockBlock.hash}`)
        .expect("Content-Type","application/json; charset=utf-8")
        .expect(200, done);
    })

    describe('Anonymous routes', () => {

        it('Should Show API landing page', function(done){
             supertest(app).get('/anonymousroute')
             .expect("Content-Type","text/html; charset=utf-8")
             .expect(200, done)

        })

    })
})
