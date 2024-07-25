import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Medical {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  CRM: string; // hash

  @Column()
  address_id: number;

  @Column()
  email: string;

  @Column('simple-array')
  roles: string[];

  @Column()
  password: string; // hash

  @Column('jsonb')
  business_hours: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;

  @Column()
  status: string;

  @Column('float')
  rating: number;
}
