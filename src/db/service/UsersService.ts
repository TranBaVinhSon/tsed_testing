import { Service, AfterRoutesInit } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";
import { User } from "../entities/User";

@Service()
export class UsersService implements AfterRoutesInit {
  // private connection: Connection;
  // constructor(private typeORMService: TypeORMService) {}

  public $afterRoutesInit(): void {
    // this.connection = this.typeORMService.get();
  }

  // async create(user: User): Promise<User> {
  //   await this.connection.manager.save(user);
  //   return user;
  // }

  // async findAll(): Promise<User[]> {
  //   const users = await this.connection.manager.find(User);
  //   console.log("Loaded users: ", users);
  //   return users;
  // }

  // async find(id: number): Promise<User> {
  //   const user = await this.connection
  //     .getRepository(User)
  //     .createQueryBuilder("user")
  //     .where("user.id = :id", { id: id })
  //     .getOne();
  //   return user;
  // }
}
