import { CustomBaseEntity } from '@model/postgres/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StoreEntity } from '@model/postgres/store/entities/store.entity';

@Entity("item")
export class ItemEntity extends  CustomBaseEntity{
  @Column({ type: 'varchar', length: 300, nullable : false })
  itemName: string;

  @Column({type : 'float', default : 0})
  price : number;

  @ManyToOne(() => StoreEntity , (store) => store.items)
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;
}
