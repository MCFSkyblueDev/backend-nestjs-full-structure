import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '@model/postgres/base/base.entity';

@Entity('login')
export class AuthenticationEntity extends CustomBaseEntity {
  @Column({ type: 'varchar', length: '256', unique: true, nullable: false })
  username: string;
  @Column({ type: 'text', nullable: false })
  password: string;
  @Column({ type: 'text', nullable: true })
  email: string;

  constructor(partial ?: Partial<AuthenticationEntity>) {
    super();
    Object.assign(this, partial);
  }
}
