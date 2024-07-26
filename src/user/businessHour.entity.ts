import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'businesshours',
})
export class BusinessHour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', name: 'doctor_id' })
  doctorId: number;

  @Column({ type: 'varchar', name: 'doctor_name' })
  doctorName: string;

  @Column({ type: 'timestamp', nullable: true, name: 'business_hours_start' })
  businessHoursStart: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'business_hours_end' })
  businessHoursEnd: Date;

  @Column({ type: 'varchar', nullable: false })
  status: string;
}
