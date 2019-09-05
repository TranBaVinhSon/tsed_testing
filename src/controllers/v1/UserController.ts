import { Controller, Get } from "@tsed/common";
import { User } from "../../db/entities/User";

@Controller("/calendars")
export class UserController {
  @Get()
  async findAll(): Promise<User[]> {
    return null;
  }
}
