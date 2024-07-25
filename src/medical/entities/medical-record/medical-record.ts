import { User } from 'src/user/entities/user/user';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  type: string; // e.g., 'document', 'exam'

  @Column()
  description: string;

  @Column()
  date: Date;
}
