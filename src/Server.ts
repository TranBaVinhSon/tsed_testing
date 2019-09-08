import "reflect-metadata";
import {
  ServerLoader,
  ServerSettings,
  GlobalAcceptMimesMiddleware
} from "@tsed/common";
import dotenv from "dotenv";
import "@tsed/typeorm";
import { User } from "./db/entities/User";
import { Post } from "./db/entities/Post";

const rootDir = __dirname;

// DB params

@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: "3000",
  httpsPort: false,
  // // config typeorm
  typeorm: [
    {
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "tsed_testing",
      synchronize: true,
      logging: false,
      entities: [User, Post]
    }
  ],
  debug: true,
  // mount controller + routing
  mount: {
    "/api/v1": `${rootDir}/controllers/v1/UserController.ts`
  }
})
export class Server extends ServerLoader {
  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */

  public $onBeforeRoutesInit(): void | Promise<any> {
    this.use(GlobalAcceptMimesMiddleware);
    return null;
  }
}
