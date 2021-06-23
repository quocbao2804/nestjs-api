import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  // UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
// import { NotFoundExceptionFilter } from '../common/exception-filter/not-found.filter';
import { AddProjectDTO } from './dto/add-project.dto';
import { EditProjectDTO } from './dto/edit-project.dto';
import { ProjectService } from './project.service';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  @ApiOkResponse({ description: 'Success' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server' })
  async getAllProject() {
    return await this.projectService.getAllProject();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server' })
  async getProjectByIdOrFail(@Param('id') id: number) {
    return await this.projectService.getOneByIdOrFail(id);
  }

  @Get('code/:code')
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server' })
  async getOneTaskByCode(@Param('code') code: string) {
    return await this.projectService.getOneByCodeOrFail(code);
  }

  @Get('/:id/tasks')
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server' })
  async getAllTaskByID(@Param('id') id: number) {
    return await this.projectService.getAllTaskByID(id);
  }

  @Get('/:id/users')
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server' })
  async getAllUserByID(@Param('id') id: number) {
    return await this.projectService.getAllUserByID(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server' })
  async createProject(@Body() dto: AddProjectDTO) {
    return await this.projectService.createProject(dto);
  }

  @Post(':code/addUser/:id')
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server' })
  async addUser(@Param('id') id: number, @Param('code') code: string) {
    return await this.projectService.addUser(code, id);
  }

  @Post(':code/addTask/:codeTask')
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server' })
  async addTask(
    @Param('codeTask') codeTask: string,
    @Param('code') code: string,
  ) {
    return await this.projectService.addTask(code, codeTask);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server' })
  async editProject(@Body() dto: EditProjectDTO, @Param('id') id: number) {
    return await this.projectService.editProject(id, dto);
  }

  // @UseFilters(NotFoundExceptionFilter)
  @Delete(':id')
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server' })
  async removeProject(@Param('id') id: number) {
    return await this.projectService.remove(id);
  }

  @Delete(':code/removeUser/:id')
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server' })
  async removeUserInProject(
    @Param('id') idUser: number,
    @Param('code') code: string,
  ) {
    return await this.projectService.removeUserInProject(idUser, code);
  }

  @Delete(':code/removeTask/:codeTask')
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server' })
  async removeTaskInProject(
    @Param('codeTask') codeTask: string,
    @Param('code') code: string,
  ) {
    return await this.projectService.removeTaskInProject(code, codeTask);
  }
}
