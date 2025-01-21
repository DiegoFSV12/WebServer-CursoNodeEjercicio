import express from 'express';

export class Server{
    private app = express();
    async start(PORT:Number){
        //Middlewares

        //Public folder
        this.app.use(express.static('public'));

        this.app.listen(PORT,()=>{
            console.log(`Server running on port ${PORT}`);
        })
    }
}