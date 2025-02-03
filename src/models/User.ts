// user.entity.ts (or whatever you name your entity file)
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Users' }) // Replace 'users' with your actual table name
export class User {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ type: 'jsonb', nullable: true }) // Important: type: 'jsonb'
  jsonData: any; // Or be more specific if you know the structure: jsonData: { name: string; address: { city: string; }; ... };

}