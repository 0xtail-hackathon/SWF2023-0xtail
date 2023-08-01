import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('fund')
@Index(['artifactName'])
export class FundEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, name: 'id' })
  id?: string;

  @Column({ type: 'varchar', name: 'usr_nm' })
  userName: string;

  @Column({ type: 'varchar', name: 'art_nm' })
  artifactName: string;

  @Column({ type: 'int', name: 'amount', default: 1000000 })
  amount: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
}
