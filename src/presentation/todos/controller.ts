import { Request,Response } from "express";
import { prisma } from "../../data/postgresql";
import { CreateToDoDTO, UpdateToDoDTO } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController{
    constructor(
        private readonly todoRepository: TodoRepository,
    ){}
    /*Traer todos los ToDo */
    public getTodos = async(req:Request,res:Response)=>{
        const todos = await this.todoRepository.getAll();
        res.json(todos);
    }
    /*Traer ToDo segun su Id*/
    public getTodoById = async (req:Request,res:Response)=>{
        const id = +req.params.id;/*Transforma el string a un numero*/
        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo);
        } catch (error) {
            res.status(404).json({error});
        }
    }

    public createToDo = async(req:Request,res:Response)=>{
        const [error,createToDoDTO] = CreateToDoDTO.create(req.body);
        if(error) res.status(404).json({error});
        const todo = await this.todoRepository.create(createToDoDTO!);
        res.json(todo);
    }

    //Usamos PUT para actualizar un ToDo
    public updateToDo = async(req:Request, res:Response) => {
        //Buscar y validar
        const id = +req.params.id;
        const [error, updateTodoDTO] = UpdateToDoDTO.update({...req.body, id});
        if(error) res.status(404).json({error});
        const todo = await this.todoRepository.updateById(updateTodoDTO!);
        res.json(todo);
    }

    //Usamos DELETE para borrar fisicamente un elemento
    public deleteToDo = async(req:Request,res:Response) =>{
        //Buscar y validar
        const id = +req.params.id;
        const todo = await this.todoRepository.deleteById(id);
        res.json(todo);
    }
}