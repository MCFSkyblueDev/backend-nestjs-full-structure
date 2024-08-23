import { CustomBaseEntity } from '@model/postgres/base/base.entity';
import { Repository, FindOptionsWhere, DeepPartial, UpdateResult } from 'typeorm';


export class BaseRepository<T extends CustomBaseEntity> extends Repository<T> {
  async getAll(): Promise<T[]> {
    return await this.createQueryBuilder('entity').orderBy('entity.createdAt', 'ASC').getMany();
  }

  async getById(id: number) {
    return await this.findOne({ where: { id } as any });
  }

  // Generic
  async getOneByCriteria(criteria: FindOptionsWhere<T>): Promise<T | null> {
    try {
      return await this.findOne({
        where: criteria,
      });
    } catch (error) {
      // console.error('Error fetching entity by criteria:', error);
      return null;
    }
  }
  //await this.userService.getOneByCriteria({rootAddress: walletAddress});

  async getManyByCriteria(criteria: FindOptionsWhere<T>): Promise<T[] | null> {
    try {
      return await this.find({
        where: criteria,
      });
    } catch (error) {
      // console.error('Error fetching entity by criteria:', error);
      return null;
    }
  }


  async updateByCriteria(
    criteria: FindOptionsWhere<T>,
    updateFields: DeepPartial<T>
  ): Promise<Partial<T> | null> {
    try {
      const updateResult: UpdateResult = await this.update(criteria, updateFields as any);
      if (updateResult.affected && updateResult.affected > 0) {
        const updatedEntity = await this.findOne({where: criteria});
        return updatedEntity ? updatedEntity : null;
      }
      return null;
    } catch (error) {
      // console.error('Error updating entity by criteria:', error);
      return null;
    }
  }

}