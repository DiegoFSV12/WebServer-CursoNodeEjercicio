import { CreateToDoDTO } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface CreateTodoUseCase{
    execute(dto:CreateToDoDTO):Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUseCase{
    constructor(
        private readonly repository:TodoRepository,
    ){}

    execute(dto: CreateToDoDTO): Promise<TodoEntity> {
        return this.repository.create(dto);
    }

}