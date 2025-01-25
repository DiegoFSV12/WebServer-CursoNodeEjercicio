import { Request,Response } from "express";

const todos = [
    {id:1,text:'Buy milk',createdAt: new Date()},
    {id:2,text:'Buy meat',createdAt: null},
    {id:3,text:'Buy bread',createdAt: new Date()},
];

export class TodosController{
    constructor(){}
    /*Traer todos los ToDo */
    public getTodos = (req:Request,res:Response)=>{
        res.json(todos);
    }
    /*Traer ToDo segun su Id*/
    public getTodoById = (req:Request,res:Response)=>{
        const id = +req.params.id;/*Transforma el string a un numero*/
        if(isNaN(id)) res.status(404).json({error:`ID argument is not a number`});
        const todo = todos.find(todo=>todo.id === id);
        if(todo){
            res.json(todo);
        }else{
            res.status(404).json({error:`ToDo with id ${id} not found`});
        }
    }

    public createToDo = (req:Request,res:Response)=>{
        const {text} = req.body;
        if(!text) res.status(404).json({error:`Text property is required`});
        const newToDo = {
            id: todos.length+1,
            text: text,
            createdAt: null
        };
        todos.push(newToDo);
        res.json(newToDo);
    }
}