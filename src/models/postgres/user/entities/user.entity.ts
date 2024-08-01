import { CustomBaseEntity } from '@model/postgres/base/base.entity';
import { Check, Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { StoreEntity } from '@model/postgres/store/entities/store.entity';
import { RoomEntity } from '@model/postgres/room/entities/room.entity';

@Entity({ name: 'users' })
@Check(`"role" IN (0,1,2)`)
export class UserEntity extends CustomBaseEntity {
  @Column({ type: 'varchar', length: '256', unique: true, nullable: false })
  username: string;

  @Column({ type: 'integer', default: 0, nullable: false })
  role: number;

  @Column({ type: 'boolean', default: true, nullable: false })
  gender: boolean;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  email: string;

  @OneToMany(() => StoreEntity, (store) => store.user)
  stores: StoreEntity[];

  @ManyToMany(() => RoomEntity, (room) => room.users)
  rooms: RoomEntity[];

  constructor(partial ?: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
