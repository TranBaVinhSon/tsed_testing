import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn({
    unsigned: true
  })
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  name: string;

  @ManyToOne(type => User, user => user.posts)
  user: User;
}
