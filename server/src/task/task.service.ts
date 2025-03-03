import { Body, Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {

    private task = []

    getTasks(){
        return this.task;
    };

    findOne(id: number){
        return this.task.find(task => task.id === id)
    }

    createTask(task:any){
        this.task.push({
            ...task,
            id: this.task.length + 1,
        })
        return task
    }

    remuve(id: number){
        this.task.find(task => task.id === id)
        return `Se elimino la Tarea ${id}`
    }

}
