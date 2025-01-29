import { prisma } from "../../data/postgresql";
import { CreateToDoDTO, TodoDatasource, TodoEntity, UpdateToDoDTO } from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource{
    create(createTodoDTO: CreateToDoDTO): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo=>TodoEntity.fromObject(todo));
    }
    findById(id: number): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    updateById(updateTodoDTO: UpdateToDoDTO): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }

}