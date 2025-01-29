import { prisma } from "../../data/postgresql";
import { CreateToDoDTO, TodoDatasource, TodoEntity, UpdateToDoDTO } from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource{
    async create(createTodoDTO: CreateToDoDTO): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDTO!
        });
        return TodoEntity.fromObject(todo);
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo=>TodoEntity.fromObject(todo));
    }
    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({
            where: {
                id : id
            }
        });
        if(!todo) throw `ToDo with id ${id} not found`;
        return TodoEntity.fromObject(todo);
    }
    async updateById(updateTodoDTO: UpdateToDoDTO): Promise<TodoEntity> {
        await this.findById(updateTodoDTO.id);
        const updatetodo = await prisma.todo.update({
            where: {
                id : updateTodoDTO.id
            },
            data: updateTodoDTO!.values
        });
        return TodoEntity.fromObject(updatetodo);
    }
    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);
        const deleted = await prisma.todo.delete({
            where: {
                id : id
            }
        });
        return TodoEntity.fromObject(deleted);
    }

}