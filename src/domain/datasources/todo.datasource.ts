import { CreateToDoDTO, UpdateToDoDTO } from "../dtos";
import { TodoEntity } from "../todo.entity";

export abstract class TodoDatasource{
    abstract create(createTodoDTO:CreateToDoDTO): Promise<TodoEntity>;

    abstract getAll():Promise<TodoEntity[]>;

    abstract findById(id:number):Promise<TodoEntity>;

    abstract updateById(updateTodoDTO:UpdateToDoDTO):Promise<TodoEntity>;

    abstract deleteById(id:number):Promise<TodoEntity>;
}