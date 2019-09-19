import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Property, PropertyType, Required} from "@tsed/common";
import {Post} from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    unsigned: true
  })
  @Property()
  id: number;

  @Column({unique: true})
  @Required()
  @Property()
  name: string;

  @OneToMany(type => Post, post => post.user)
  @PropertyType(Post)
  posts: Post[];
}
