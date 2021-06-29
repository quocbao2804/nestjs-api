import { UsersEntity } from './users.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UsersEntity)
export class UserRepository extends Repository<UsersEntity> {
  getOneById(id) {
    return this.findOne({ id, isDeleted: 0 });
  }

  getAll() {
    return this.find({ isDeleted: 0 });
  }

  async isUserDeleted(projectId: number, id: number) {
    const entity = await this.count({
      where: { id, projectId: projectId },
    });
    return entity > 0;
  }

  async isUserExistInProject(projectId: number, id: number) {
    const entity = await this.count({
      where: { id, projectId: projectId },
    });
    return entity > 0;
  }

  async getAllUserByIDProject(idProject: number) {
    return await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.projects', 'project')
      .where('project.id = :idProject', { idProject })
      .getMany();
  }

  async getAllUserByIDGroup(idGroup: number) {
    return await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.groups', 'group')
      .where('group.id = :idGroup', { idGroup })
      .getMany();
  }

  async countUserInGroup(idGroup: number) {
    return await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.groups', 'group')
      .where('group.id = :idGroup', { idGroup })
      .getCount();
  }

  async isUserExist(idProject: number) {
    const response = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.projects', 'project')
      .where('project.id = :idProject', { idProject })
      .getCount();
    return response > 0;
  }
}
