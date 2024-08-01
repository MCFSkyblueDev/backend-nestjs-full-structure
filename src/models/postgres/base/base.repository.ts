import { CustomBaseEntity } from '@model/postgres/base/base.entity';
import { Repository } from 'typeorm';


export class BaseRepository<T extends CustomBaseEntity> extends Repository<T> {
  async getAll(): Promise<T[]> {
    return await this.createQueryBuilder('entity').orderBy('entity.createdAt', 'ASC').getMany();
  }

  async getById(id: number) {
    return await this.findOne({ where: { id } as any });
  }

}