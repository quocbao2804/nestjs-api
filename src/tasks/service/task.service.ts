import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AddTaskDTO } from 'src/tasks/dto/add-task.dto';
import { EditTaskDTO } from 'src/tasks/dto/edit-task.dto';
import { TaskRepository } from 'src/tasks/repo/task.respository';
import { GetTaskRO } from 'src/tasks/ro/get-task.ro';
import { TaskEntity } from '../entity/task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepo: TaskRepository) {}

  async dataTransfer(task: TaskEntity) {
    const taskRO = new GetTaskRO();
    taskRO.name = (await task).name;
    taskRO.codeId = (await task).codeId;
    taskRO.user = (await task).user;
    taskRO.group = (await task).group;
    return taskRO;
  }

  async getOneByIdForUser(id: number) {
    const task = await this.taskRepo.getById(id);
    if (!task) {
      throw new NotFoundException('Task ID Not Found');
    } else {
      return await this.dataTransfer(task);
    }
  }

  async getOneById(id: number) {
    return await this.taskRepo.getById(id);
  }

  async getOneByIdOrFail(id: number) {
    const task = await this.getOneById(id);
    if (!task) {
      throw new HttpException('Task Not Found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async getOneByIdOrFailForUser(id: number) {
    const task = await this.getOneById(id);
    if (!task) {
      throw new HttpException('Task Not Found', HttpStatus.NOT_FOUND);
    }
    return await this.dataTransfer(task);
  }

  async getAllTask() {
    return await this.taskRepo.getAllTask();
  }

  async getAllTaskByIdGroup(idGroup: number) {
    return this.taskRepo.getAllTaskByIdGroup(idGroup);
  }

  async getOneByCodeId(codeId: number) {
    return await this.taskRepo.getByCodeId(codeId);
  }

  async getOneTaskByCodeIdOrFail(codeId: number) {
    const task = await this.getOneByCodeId(codeId);
    if (!task) {
      throw new HttpException('Task Not Found', HttpStatus.NOT_FOUND);
    }
    return await this.dataTransfer(task);
  }

  async createTask(dto: AddTaskDTO) {
    try {
      const newTask = await this.taskRepo.create(dto);
      return await this.taskRepo.save(newTask);
    } catch (e) {
      throw new InternalServerErrorException('Sorry, Server is being problem');
    }
  }

  async editTask(id: number, dto: EditTaskDTO) {
    const task = this.getOneByIdOrFail(id);
    try {
      return await this.taskRepo.update((await task).id, dto);
    } catch (e) {
      if ((await task).id == undefined) {
        throw new NotFoundException();
      } else {
        throw new InternalServerErrorException(
          'Sorry, Server is being problem',
        );
      }
    }
  }

  async removeTask(id: number) {
    const task = this.getOneByIdOrFail(id);
    try {
      // return await this.taskRepo.delete((await task).id);
      (await task).isDelete = (await task).id;
      return this.taskRepo.save(await task);
    } catch (e) {
      if ((await task).id == undefined) {
        throw new NotFoundException();
      } else {
        throw new InternalServerErrorException(
          'Sorry, Server is being problem',
        );
      }
    }
  }
}