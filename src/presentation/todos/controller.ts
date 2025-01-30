import { Request,Response } from "express";
import { prisma } from "../../data/postgresql";
import { CreateToDoDTO, UpdateToDoDTO } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetAllTodo, GetTodo, TodoRepository, UpdateTodo } from "../../domain";

export class TodosController{
    constructor(
        private readonly todoRepository: TodoRepository,
    ){}
    /*Traer todos los ToDo */
    public getTodos = async(req:Request,res:Response)=>{
        new GetAllTodo(this.todoRepository)
        .execute()
        .then(todo=>res.json(todo))
        .catch(error => res.status(400).json({error}))
    }
    /*Traer ToDo segun su Id*/
    public getTodoById = async (req:Request,res:Response)=>{
        const id = +req.params.id;/*Transforma el string a un numero*/
        new GetTodo(this.todoRepository)
        .execute(id)
        .then(todo=>res.json(todo))
        .catch(error => res.status(400).json({error}))
    }

    public createToDo = async(req:Request,res:Response)=>{
        const [error,createToDoDTO] = CreateToDoDTO.create(req.body);
        if(error) res.status(404).json({error});
        new CreateTodo(this.todoRepository)
        .execute(createToDoDTO!)
        .then(todo=>res.json(todo))
        .catch(error => res.status(400).json({error}))
    }

    //Usamos PUT para actualizar un ToDo
    public updateToDo = async(req:Request, res:Response) => {
        //Buscar y validar
        const id = +req.params.id;
        const [error, updateTodoDTO] = UpdateToDoDTO.update({...req.body, id});
        if(error) res.status(404).json({error});
        new UpdateTodo(this.todoRepository)
        .execute(updateTodoDTO!)
        .then(todo=>res.json(todo))
        .catch(error => res.status(400).json({error}))
    }

    //Usamos DELETE para borrar fisicamente un elemento
    public deleteToDo = async(req:Request,res:Response) =>{
        //Buscar y validar
        const id = +req.params.id;
        new DeleteTodo(this.todoRepository)
        .execute(id)
        .then(todo=>res.json(todo))
        .catch(error => res.status(400).json({error}))
    }
}