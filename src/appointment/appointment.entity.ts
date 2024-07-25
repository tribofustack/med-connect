import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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
