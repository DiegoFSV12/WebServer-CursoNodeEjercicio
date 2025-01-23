import express, { Router } from 'express';
import path from 'path';

interface Options{
    PORT: number,
    routes: Router,
    PUBLIC_PATH?:string
}

export class Server{
    private app = express();
    private readonly port:number;
    private readonly publicpath:string;
    private readonly routes: Router;

    constructor(options:Options){
        const {PORT,PUBLIC_PATH='public',routes} = options;
        this.port=PORT;
        this.publicpath=PUBLIC_PATH;
        this.routes=routes;
    }
    async start(){
        //Middlewares(Función que se ejecuta cuando una petición pase x ahi)

        //Public folder
        this.app.use(express.static(this.publicpath));

        //Routes
        this.app.use(this.routes);

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