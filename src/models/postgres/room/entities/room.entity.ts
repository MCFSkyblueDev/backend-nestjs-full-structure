import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { CustomBaseEntity } from '@model/postgres/base/base.entity';
import { UserEntity } from '@model/postgres/user/entities/user.entity';

@Entity({ name: 'room' })
export class RoomEntity extends CustomBaseEntity {
  @Column({ type: 'varchar', length: '256', unique: true, nullable: false })
  code: string;

  @Column({ type: 'varchar', length: '256', nullable: false })
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.rooms)
  @JoinTable({
    name: 'user_room',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'room_id', referencedColumnName: 'id' },
  })
  users: UserEntity[];

  constructor(partial ?: Partial<RoomEntity>) {
    super();
    Object.assign(this, partial);
  }
}