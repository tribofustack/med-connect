import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'auth',
})
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'access_token',
  })
  accessToken: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({
    name: 'email_confirmed_at',
    type: 'timestamp',
  })
  emailConfirmedAt: Date;

  @Column({ type: 'varchar', nullable: true })
  document: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'timestamp', name: 'password_expires_at' })
  passwordExpiresAt: Date;

  @Column({
    type: 'enum',
    enum: ['doctor', 'user'],
  })
  type: 'doctor' | 'user';
}
