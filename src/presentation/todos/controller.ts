import { Request,Response } from "express";

const todos = [
    {id:1,text:'Buy milk',completedAt: new Date()},
    {id:2,text:'Buy meat',completedAt: null},
    {id:3,text:'Buy bread',completedAt: new Date()},
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
        if(isNaN(id)) {
            res.status(404).json({error:`ID argument is not a number`});
            return;
        }
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
            completedAt: null
        };
        todos.push(newToDo);
        res.json(newToDo);
    }

    //Usamos PUT para actualizar un ToDo
    public updateToDo = (req:Request, res:Response) => {
        //Buscar y validar
        const id = +req.params.id;
        if(isNaN(id)) res.status(404).json({error:`ID argument is not a number`});
        const todo = todos.find(todo=>todo.id === id);
        if(!todo) {
            res.status(404).json({error:`ToDo with id ${id} not found`});
            return;
        }
        const {text, completedAt} = req.body;
        if(!text) res.status(404).json({error:`Text property is required`});

        todo.text = text || todo.text;
        if(completedAt === null){
            todo.completedAt = null;
        }else{
            todo.completedAt = new Date(completedAt || todo.completedAt);
        }
        todos.forEach((todo, index)=>{
            if(todo.id === id){
                todos[index] = todo
            }
        })
        res.json(todo);
    }

    //Usamos DELETE para borrar fisicamente un elemento
    public deleteToDo = (req:Request,res:Response) =>{
        //Buscar y validar
        const id = +req.params.id;
        const todo = todos.find(todo=>todo.id === id);
        if(!todo) {
            res.status(404).json({error:`ToDo with id ${id} not found`});
            return;
        }
        todos.splice(todos.indexOf(todo),1);
        res.json(todo);
    }
}