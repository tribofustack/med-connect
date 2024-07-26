import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  status: string;

  @Column('jsonb', { nullable: true })
  event: {
    start_date: Date;
    end_date: Date;
  };

  @Column({ nullable: true })
  meet_url: string

  @Column()
  doctorId: number;

  @Column()
  pacientId: number
}
