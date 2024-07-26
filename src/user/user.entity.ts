import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  cpf: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  CRM: string; // hash

  @Column('jsonb', { nullable: true })
  business_hours: any;

  @Column('float', { nullable: true })
  rating: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;
}
