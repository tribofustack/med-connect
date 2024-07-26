import { File } from 'src/medical/file.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column('jsonb')
  event: {
    start_date: Date;
    end_date: Date;
    attachments: { file_url: string; file_id: string }[];
    creator: { id: number; email: string; displayName: string };
    organizer: { id: number; email: string; displayName: string };
  };

  @Column('jsonb')
  meet: {
    host: string;
    code: string;
    name: string;
    url: string;
    artifact: { transcription: string; record: string };
  };

  @ManyToOne(() => File, (medical) => medical.id)
  doctor: File;

  @ManyToOne(() => User, (user) => user.id)
  patient: User;
}
