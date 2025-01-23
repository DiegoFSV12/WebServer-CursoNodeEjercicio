import express from 'express';
import path from 'path';

interface Options{
    PORT: number,
    PUBLIC_PATH?:string
}

export class Server{
    private app = express();
    private readonly port:number;
    private readonly publicpath:string;

    constructor(options:Options){
        const {PORT,PUBLIC_PATH='public'} = options;
        this.port=PORT;
        this.publicpath=PUBLIC_PATH;
    }
    async start(){
        //Middlewares

        //Public folder
        this.app.use(express.static(this.publicpath));

        //Routes
        this.app.get('/api/todos',(req,res)=>{
            res.json([
                {id:1,text:'Buy milk',createdAt: new Date()},
                {id:2,text:'Buy meat',createdAt: null},
                {id:3,text:'Buy bread',createdAt: new Date()},
            ]);
        })

        //SPA
        this.app.get('*',(req,res)=>{
            const indexPath = path.join(__dirname+`../../../${this.publicpath}/index.html`);
            res.sendFile(indexPath);
        })

        this.app.listen(this.port,()=>{
            console.log(`Server running on port ${this.port}`);
        })
    }
}