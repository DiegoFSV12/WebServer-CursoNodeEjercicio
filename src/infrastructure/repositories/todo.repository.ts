import { CreateToDoDTO, TodoDatasource, TodoEntity, TodoRepository, UpdateToDoDTO } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository{

    constructor(
        private readonly datasource:TodoDatasource,
    ){}

    create(createTodoDTO: CreateToDoDTO): Promise<TodoEntity> {
        return this.datasource.create(createTodoDTO);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: number): Promise<TodoEntity> {
        return this.datasource.findById(id);
    }
    updateById(updateTodoDTO: UpdateToDoDTO): Promise<TodoEntity> {
        return this.datasource.updateById(updateTodoDTO);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id);
    }

}