import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('artifact')
@Unique(['name'])
export class ArtifactEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'id' })
  id?: string;

  @Column({ type: 'varchar', name: 'name' })
  name?: string;

  @Column({ type: 'varchar', name: 'address' })
  address?: string;

  @Column({ type: 'varchar', name: 'exc_loc' })
  excavation_location?: string;

  @Column({ type: 'varchar', name: 'cur_loc' })
  current_location?: string;

  @Column({ type: 'varchar', name: 'era' })
  era?: string;

  @Column({ type: 'varchar', name: 'category' })
  category?: string;

  @Column({ type: 'varchar', name: 'size' })
  size?: string;

  @Column({ type: 'int', name: 'coll_num' })
  collection_number?: number;

  @Column({ type: 'varchar', name: 'img_url' })
  imageUrl?: string;

  @Column({ type: 'int', name: 'value'})
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
