import { CreateDateColumn, Entity, UpdateDateColumn, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class CustomBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
