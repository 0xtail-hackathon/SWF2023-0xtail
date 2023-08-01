import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('user')
@Unique(['name'])
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'id' })
  id?: string;

  @Column({ type: 'varchar', name: 'name' })
  name?: string;

  @Column({ type: 'varchar', name: 'address' })
  address?: string;

  @Column({ type: 'varchar', name: 'private_key' })
  privateKey?: string;

  @Column({ type: 'int', name: 'krw', default: 1000000 })
  krw?: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt?: Date;
}
