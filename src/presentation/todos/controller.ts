import { Request,Response } from "express";
import { prisma } from "../../data/postgresql";

export class TodosController{
    constructor(){}
    /*Traer todos los ToDo */
    public getTodos = async(req:Request,res:Response)=>{
        const todos = await prisma.todo.findMany();
        res.json(todos);
    }
    /*Traer ToDo segun su Id*/
    public getTodoById = async (req:Request,res:Response)=>{
        const id = +req.params.id;/*Transforma el string a un numero*/
        if(isNaN(id)) {
            res.status(404).json({error:`ID argument is not a number`});
            return;
        }
        const todo = await prisma.todo.findUnique({
            where: {
                id : id
            }
        });
        if(todo){
            res.json(todo);
        }else{
            res.status(404).json({error:`ToDo with id ${id} not found`});
        }
    }

    public createToDo = async(req:Request,res:Response)=>{
        const {text} = req.body;
        if(!text) res.status(404).json({error:`Text property is required`});
        const todo = await prisma.todo.create({
            data:{text}
        });
        res.json(todo);
    }

    //Usamos PUT para actualizar un ToDo
    public updateToDo = async(req:Request, res:Response) => {
        //Buscar y validar
        const id = +req.params.id;
        if(isNaN(id)) res.status(404).json({error:`ID argument is not a number`});
        const todo = await prisma.todo.findUnique({
            where: {
                id : id
            }
        });
        if(!todo) res.status(404).json({error: `Todo with id ${id} not found`});
        const {text, completedAt} = req.body;
        if(!text) res.status(404).json({error:`Text property is required`});
        const updatetodo = await prisma.todo.update({
            where: {
                id : id
            },
            data: {
                text: text,
                completedAt: (completedAt) ? new Date(completedAt) : null
            }
        });
        res.json(updatetodo);
    }

    //Usamos DELETE para borrar fisicamente un elemento
    public deleteToDo = async(req:Request,res:Response) =>{
        //Buscar y validar
        const id = +req.params.id;
        const todo = await prisma.todo.findUnique({
            where: {
                id : id
            }
        });
        if(!todo) res.status(404).json({error: `Todo with id ${id} not found`});
        const deleted = await prisma.todo.delete({
            where: {
                id : id
            }
        });
        res.json({todo, deleted});
    }
}