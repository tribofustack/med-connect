import { Appointment } from 'src/appointment/appointment.entity';
import { MedicalRecords } from 'src/medical/medical-records.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
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

  @Column({ nullable: false, type: 'varchar' })
  cpf: string;

  @Column({ nullable: true, type: 'varchar' })
  address: string;

  @Column({ type: 'timestamp', nullable: true, name: 'last_login' })
  lastLogin: Date;

  @CreateDateColumn({ type: 'timestamp', nullable: true, name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true, name: 'updated_at' })
  updated_at: Date;

  @OneToMany(() => MedicalRecords, (mr) => mr.user)
  medicalRecords: MedicalRecords[];

  @OneToMany(() => Appointment, (ap) => ap.user)
  appointments: Appointment[];
}
