import { OrganizationEntity } from './organization.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(OrganizationEntity)
export class OrganizationRepository extends Repository<OrganizationEntity> {
  getAll() {
    return this.find({ isDeleted: null });
  }

  getById(id: number) {
    return this.findOne({ id, isDeleted: null });
  }

  getByCode(code: string) {
    return this.findOne({ code, isDeleted: null });
  }

  async countOrg(id: number) {
    return (
      (await this.count({
        where: { id, isDeleted: null },
      })) > 0
    );
  }
}
