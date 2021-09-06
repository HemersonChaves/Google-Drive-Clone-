import {describe, test, expect} from '@jest/globals'
import Routes from './../../src/routes.js'
describe('#Routes suite test', ()=> {
    describe('#setSocketInstance', ()=>{
        test("setSocket should store io instance",()=>{
            const routes = new Routes();
            const ioObj ={
                to:(id)=>ioObj,
                emit:(event, message)=>{

                }
            }
            
            routes.setSocketInstance(ioObj),
            expect(routes.io).toStrictEqual(ioObj)
        })
    });
    describe('#handler',()=>{
        const defaultParams ={
            request:{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                method :'',
                body:{}
            },
            response:{
                setHeader: jest.fn(),
                writeHead: jest.fn(),
                end: jest.fn()
            },
            values:() => Object.values(defaultParams)
        }
        test.todo("given an inexistent routes it should choose default route",()=>{
            const routes = new Routes();
            const params ={
                ...defaultParams
            }
            params.request.method= 'inexistent';
            routes.handler(...params.values());
            expect(params.response.end).toHaveBeenCalled('Hello word')
        })
        test.todo("it should set any request with CORS enabled")
        test.todo("given method OPTIONS it should chose options route")
        test.todo("given method GET it should chose options route")
        test.todo("given method POST it should chose options route")
    })
    
})