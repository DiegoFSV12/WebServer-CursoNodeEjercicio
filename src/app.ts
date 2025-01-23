import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(()=>{
    main();
})();

function main(){
    const server = new Server({
        PORT:3000,
        routes: AppRoutes.routes,
        PUBLIC_PATH:'public'
    });
    server.start();
}