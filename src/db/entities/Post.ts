import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { User } from "./User";
import { Property, Required } from "@tsed/common";

@Entity()
export class Post {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  @Property()
  id: number;

  @Column({ unique: true })
  @Required()
  name: string;

  @ManyToOne(type => User, user => user.posts)
  @Property()
  user: User;
}
