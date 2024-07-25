import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user/user';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  doctor: User;

  @ManyToOne(() => User)
  patient: User;

  @Column()
  date: Date;

  @Column()
  status: string; // e.g., 'pending', 'accepted', 'rejected'
}
