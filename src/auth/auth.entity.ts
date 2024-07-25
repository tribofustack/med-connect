import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  access_token: string;

  @Column()
  email: string;

  @Column()
  document: string;

  @Column()
  password: string;

  @Column()
  type: string;

  @Column()
  MFA: boolean;
}
