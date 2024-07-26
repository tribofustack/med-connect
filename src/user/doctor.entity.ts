import { Appointment } from 'src/appointment/appointment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({
  name: 'doctors',
})
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
  })
  lastName: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({
    name: 'email_confirmed_at',
    type: 'timestamp',
    nullable: true,
  })
  emailConfirmedAt: Date;

  @Column({ type: 'varchar' })
  password: string; // hash

  @Column({ nullable: true, type: 'varchar', length: '11' })
  cpf: string;

  @Column({ nullable: true, type: 'varchar' })
  address: string;

  @Column({ nullable: false, type: 'varchar' })
  crm: string; // hash

  @Column({ type: 'timestamp', nullable: true, name: 'business_hours_start' })
  businessHoursStart: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'business_hours_end' })
  businessHoursEnd: Date;

  @Column({ nullable: true, type: 'integer' })
  rating: number;

  @Column({ type: 'timestamp', nullable: true, name: 'last_login' })
  lastLogin: Date;

  @CreateDateColumn({ type: 'timestamp', nullable: true, name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true, name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Appointment, (ap) => ap.doctor)
  appointments: Appointment[];
}
