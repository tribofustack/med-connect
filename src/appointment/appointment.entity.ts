import { Doctor } from 'src/user/doctor.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'appointments',
})
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({
    type: 'varchar',
    enum: ['created', 'approved', 'disapproved'],
  })
  status: 'created' | 'approved' | 'disapproved';

  @Column({ type: 'timestamp', nullable: true, name: 'appointment_start' })
  appointmentStart: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'appointment_end' })
  appointmentEnd: Date;

  @Column({ nullable: true, name: 'meet_url' })
  meetUrl: string;

  @Column({
    type: 'uuid',
    name: 'medical_records_id',
  })
  medicalRecordsId: string;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'integer', name: 'user_id' })
  userId: number;

  @ManyToOne(() => Doctor, (dc) => dc.appointments)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @Column({ type: 'integer', name: 'doctor_id' })
  doctorId: number;
}
