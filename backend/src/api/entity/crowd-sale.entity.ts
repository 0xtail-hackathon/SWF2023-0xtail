import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('crowd_sale')
@Unique(['name'])
export class CrowdSaleEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'id' })
  id?: string;

  @Column({ type: 'varchar', name: 'name' })
  name?: string;

  @Column({ type: 'varchar', name: 'address' })
  address?: string;

  @Column({ type: 'text', name: 'description' })
  description?: string;

  @Column({ type: 'bigint', name: 'value'})
  value?: number;

  @Column({ type: 'varchar', name: 'strt_date' })
  startDate?: string;

  @Column({ type: 'varchar', name: 'exp_date' })
  expiredDate?: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt?: Date;
}
