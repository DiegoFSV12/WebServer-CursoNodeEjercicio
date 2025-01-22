import { Server } from "./presentation/server";

(()=>{
    main();
})();

function main(){
    const server = new Server({
        PORT:3000,
        PUBLIC_PATH:'public'
    });
    server.start();
}