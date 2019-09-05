import {
  ServerLoader,
  ServerSettings,
  GlobalAcceptMimesMiddleware
} from "@tsed/common";
import "reflect-metadata";
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
      name: "default",
      host: "127.0.0.1",
      type: "mysql",
      port: 3606,
      username: "root",
      password: "root",
      database: "tsed_testing",
      logging: true, // logging query for debugging
      entities: [User, Post]
    }
  ],
  // mount controller + routing
  mount: {
    "/api/v1": `${rootDir}/controllers/v1/*.ts`
  }
})
export class Server extends ServerLoader {
  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */

  public $onMountingMiddlewares(): void | Promise<any> {
    this.use(GlobalAcceptMimesMiddleware);
    return null;
  }
}
