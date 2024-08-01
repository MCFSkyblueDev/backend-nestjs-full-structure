import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '@model/postgres/user/entities/user.entity';
import { ItemEntity } from '@model/postgres/item/entities/item.entity';
import { CustomBaseEntity } from '@model/postgres/base/base.entity';

@Entity({ name: 'store' })
export class StoreEntity extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  storeName: string;

  @ManyToOne(() => UserEntity, (user) => user.stores)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => ItemEntity, (item) => item.store)
  items: ItemEntity[];
}
