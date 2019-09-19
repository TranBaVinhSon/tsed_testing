import {BodyParams, ContentType, Controller, Get, PathParams, Post, Req, Required} from "@tsed/common";
import {NotFound} from "ts-httpexceptions";
import {User} from "../../db/entities/User";
import {UsersService} from "../../db/service/UsersService";
import * as Express from "express";

@Controller("/users")
export class UserController {
  constructor(private usersService: UsersService) {
  }

  @Get()
  async findAll(): Promise<User[]> {
    // const users: User[] = await this.usersService.findAll();
    // return users;
    return null;
  }

  @Get("/:id")
  async get(@Required() @PathParams("id") id: number): Promise<User> {
    // const user = await this.usersService.find(id);
    // if (user) {
    //   return user;
    // }
    throw new NotFound("User not found");
  }

  @Post("/")
  @ContentType("application/json")
  async create(
    @BodyParams() user: User,
    @Req() user1: Express.Request,
    @BodyParams() user2: User,
    @BodyParams() user3: any,
    @BodyParams(User) user4: User,
    @Req() user5: any,
  ): Promise<any> {
    console.log("user", user);
    console.log("user1", user1.body);
    console.log("user2", user2);
    console.log("user3", user3);
    console.log("user4", user4);
    console.log("user5", user5);
    // let tmpUser: User = new User();
    // tmpUser.name = "12321321";
    // console.log("tmpUser", tmpUser);
    // return await this.usersService.create(user);
  }
}
