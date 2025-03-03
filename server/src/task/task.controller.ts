import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { create } from 'domain';
import { query } from 'express';
import { createTaskDto } from './dto/crate-task.dto';

@Controller('task')
export class TaskController {
    constructor( private taskService:TaskService) {}


    @Get()
    getTasks(@Query()query: any){
        return this.taskService.getTasks();
    }
    @Get('/:id')
    getfindOne(@Param('id') id: string ){
        return this.taskService.findOne(parseInt(id));
    }
    @Post()
    createTask(@Body() task: createTaskDto){
        console.log(task)
        return this.taskService.createTask(task);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string ){
        return this.taskService.findOne(parseInt(id))
    }
}
