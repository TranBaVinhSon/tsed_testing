import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Post } from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    unsigned: true
  })
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  name: string;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];
}
