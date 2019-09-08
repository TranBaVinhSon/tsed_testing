import {
  Controller,
  Get,
  Post,
  BodyParams,
  Required,
  PathParams,
  ContentType
} from "@tsed/common";
import { NotFound } from "ts-httpexceptions";
import { User } from "../../db/entities/User";
import { UsersService } from "../../db/service/UsersService";

@Controller("/users")
export class UserController {
  constructor(private usersService: UsersService) {}
  @Get()
  async findAll(): Promise<User[]> {
    const users: User[] = await this.usersService.findAll();
    return users;
  }

  @Get("/:id")
  async get(@Required() @PathParams("id") id: number): Promise<User> {
    const user = await this.usersService.find(id);
    if (user) {
      return user;
    }
    throw new NotFound("User not found");
  }
  @Post("/")
  @ContentType("application/json")
  async create(@BodyParams() user: User): Promise<User> {
    // let tmpUser: User = new User();
    // tmpUser.name = "12321321";
    // console.log("tmpUser", tmpUser);
    return await this.usersService.create(user);
  }
}
